import buckets from "../../public/data/buckets.json";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

const CACHE_CONTROL = "s-maxage=600, stale-while-revalidate=86400"; // 10 perc edge cache

function applyBucketRules(list, bucketId) {
  if (!bucketId) return list;
  const b = buckets[bucketId];
  if (!b) return list;
  const { category, minPrice, maxPrice, personalizable, tags } = b.filter || {};
  return list.filter((p) => {
    if (category && !category.includes(p.category)) return false;
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    if (typeof personalizable === "boolean" && p.personalizable !== personalizable) return false;
    if (tags && tags.length && !tags.some((t) => (p.tags || []).includes(t))) return false;
    return true;
  });
}

export default async function handler(req, res) {
  try {
    const { bucket, q, category, limit } = req.query;
    const lim = Math.max(1, Math.min(100, parseInt(limit || "24", 10)));

    // alap lekérdezés Supabase-ből
    let query = supabaseAdmin
      .from("products2")
      .select("*")
      .order("sale_price", { ascending: true, nullsFirst: false })
      .order("price", { ascending: true });

    if (category) {
      const cats = String(category).split(",").map((s) => s.trim());
      query = query.in("category", cats);
    }

    if (q) {
      query = query.ilike("title", `%${q}%`);
    }

    const { data, error } = await query.limit(500);
    if (error) throw error;

    let items = data || [];
    if (bucket) items = applyBucketRules(items, String(bucket));

    items.sort((a, b) => {
      const aSale = a.sale_price ? 1 : 0;
      const bSale = b.sale_price ? 1 : 0;
      if (bSale !== aSale) return bSale - aSale;
      return a.price - b.price;
    });

    res.setHeader("Cache-Control", CACHE_CONTROL);
    return res
      .status(200)
      .json({ ok: true, count: items.length, items: items.slice(0, lim) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
}

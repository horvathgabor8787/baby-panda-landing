import { XMLParser } from "fast-xml-parser";
import { normalizeItem } from "../../lib/product-normalizer";
import buckets from "../../public/data/buckets.json";

// Vercel cache: 1 óra, SWR 1 nap
const CACHE_CONTROL = "s-maxage=3600, stale-while-revalidate=86400";

async function fetchFeed() {
  const url = process.env.FEED_URL;
  if (!url) throw new Error("FEED_URL is missing");

  const headers = {};
  if (process.env.FEED_USER && process.env.FEED_PASS) {
    const token = Buffer.from(`${process.env.FEED_USER}:${process.env.FEED_PASS}`).toString("base64");
    headers.Authorization = `Basic ${token}`;
  }

  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`Feed fetch failed: ${r.status}`);
  const text = await r.text();

  // Google Shopping XML -> rss.channel.item[]
  const parser = new XMLParser({ ignoreAttributes: true, removeNSPrefix: false, attributeNamePrefix: "" });
  const xml = parser.parse(text);
  const items = xml?.rss?.channel?.item || [];

  // Normalizálás
  const products = items.map(normalizeItem).filter(p => p.id && p.title && p.url && p.image);
  return products;
}

function applyBucketRules(products, bucketId) {
  if (!bucketId) return products;
  const b = buckets[bucketId];
  if (!b) return products;

  const { category, minPrice, maxPrice, personalizable, tags } = b.filter || {};
  return products.filter(p => {
    if (category && !category.includes(p.category)) return false;
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    if (typeof personalizable === "boolean" && p.personalizable !== personalizable) return false;
    if (tags && tags.length && !tags.some(t => p.tags.includes(t))) return false;
    return true;
  });
}

export default async function handler(req, res) {
  try {
    const { bucket, q, category, limit } = req.query;

    const all = await fetchFeed();

    let out = all;

    // Szabad szűrések
    if (category) {
      const cats = String(category).split(",").map(s => s.trim());
      out = out.filter(p => cats.includes(p.category));
    }

    if (bucket) {
      out = applyBucketRules(out, String(bucket));
    }

    if (q) {
      const needle = String(q).toLowerCase();
      out = out.filter(p => (p.title || "").toLowerCase().includes(needle));
    }

    // Rendezés: sale first, majd ár szerint növekvő
    out.sort((a, b) => {
      const aSale = a.sale_price ? 1 : 0;
      const bSale = b.sale_price ? 1 : 0;
      if (bSale !== aSale) return bSale - aSale;
      return a.price - b.price;
    });

    const lim = Math.max(1, Math.min(100, parseInt(limit || "24", 10)));
    res.setHeader("Cache-Control", CACHE_CONTROL);
    return res.status(200).json({ ok: true, count: out.length, items: out.slice(0, lim) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
}

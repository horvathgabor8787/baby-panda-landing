import { XMLParser } from "fast-xml-parser";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { normalizeItem } from "../../lib/product-normalizer";

export default async function handler(req, res) {
  try {
    // token check
    const token = req.query.token || req.headers["x-reindex-token"];
    if (!token || token !== process.env.REINDEX_TOKEN) {
      return res.status(401).json({ ok: false, error: "unauthorized" });
    }

    if (!process.env.FEED_URL) {
      return res.status(500).json({ ok: false, error: "FEED_URL missing" });
    }

    // feed fetch
    const r = await fetch(process.env.FEED_URL);
    if (!r.ok) throw new Error(`Feed fetch failed: ${r.status}`);
    const xmlText = await r.text();

    const parser = new XMLParser({ ignoreAttributes: true, removeNSPrefix: false });
    const xml = parser.parse(xmlText);
    const items = xml?.rss?.channel?.item || [];

    const normalized = items.map(normalizeItem).filter(p => p.id && p.title && p.url && p.image);

    // upsert products2
    const chunkSize = 500;
    for (let i = 0; i < normalized.length; i += chunkSize) {
      const chunk = normalized.slice(i, i + chunkSize);
      const { error } = await supabaseAdmin
        .from("products2")
        .upsert(chunk, { onConflict: "id" });
      if (error) throw error;
    }

    return res.status(200).json({ ok: true, total: normalized.length });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
}

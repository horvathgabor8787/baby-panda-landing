function moneyToNumber(s) {
  if (!s) return null;
  const num = parseFloat(String(s).replace(/[^\d.,]/g, "").replace(",", "."));
  return Math.round(num || 0);
}

function mapCategory(item) {
  const raw = (item["g:product_type"] || item["g:google_product_category"] || "").toLowerCase();
  const s = raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (/(cumilanc|cumi[-\s]*lanc)/.test(s)) return "cumilanc";
  if (/(ragcsalanc|rago(ka)?|fogz|teething)/.test(s)) return "ragcsalanc";
  if (/(emleko(r|rz)o|emlek.*doboz|memory.*box|keepsake)/.test(s)) return "emlekorzo-doboz";
  if (/(kulcstarto|key ?ring|keychain)/.test(s)) return "kulcstarto";
  if (/(honap|honapkartya|merfoldko|milestone.*card)/.test(s)) return "honapkartya";
  if (s.includes("mam") && /(cumi|pacifier)/.test(s)) return "mam-cumi";
  if (s.includes("mam") && /(uveg|cumisuveg|bottle)/.test(s)) return "mam-cumisuveg";
  return "egyeb";
}

function collectTags(item) {
  const tags = [];
  for (let i = 0; i < 5; i++) {
    const v = item[`g:custom_label_${i}`];
    if (v) tags.push(String(v).toLowerCase());
  }
  const brand = (item["g:brand"] || "").toLowerCase();
  if (brand.includes("mam")) tags.push("mam");
  return Array.from(new Set(tags));
}

function isPersonalizable(item) {
  const title = (item["g:title"] || "").toLowerCase();
  const desc = (item["description"] || item["g:description"] || "").toLowerCase();
  return /névre|neves|gravír|gravir|személyre/.test(title + " " + desc);
}

function withUTM(url) {
  try {
    const u = new URL(url);
    if (!u.searchParams.get("utm_source")) u.searchParams.set("utm_source", "nevvarazs-landing");
    if (!u.searchParams.get("utm_medium")) u.searchParams.set("utm_medium", "referral");
    if (!u.searchParams.get("utm_campaign")) u.searchParams.set("utm_campaign", "gift_buckets");
    return u.toString();
  } catch {
    return url;
  }
}

export function normalizeItem(item) {
  const price = moneyToNumber(item["g:price"] || item["g:sale_price"]);
  const sale = moneyToNumber(item["g:sale_price"]);
  const category = mapCategory(item);
  return {
    id: item["g:id"] || item["id"] || item["sku"],
    title: item["g:title"] || item["title"],
    url: withUTM(item["g:link"] || item["link"]),
    image: item["g:image_link"] || item["image_link"],
    price: price || 0,
    sale_price: sale || null,
    currency: "HUF",
    category,
    brand: item["g:brand"] || "",
    availability: (item["g:availability"] || "").toLowerCase(),
    personalizable: isPersonalizable(item),
    tags: collectTags(item),
  };
}

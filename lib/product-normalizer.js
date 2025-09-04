// Egységes termékobjektum a Google Shopping XML-ből
function moneyToNumber(s) {
  if (!s) return null;
  // formátum pl. "8990 HUF" vagy "8990"
  const num = parseFloat(String(s).replace(/[^\d.,]/g, "").replace(",", "."));
  return Math.round(num || 0);
}

// product_type / google_product_category -> belső "category"
function mapCategory(item) {
  const pt = (item["g:product_type"] || item["g:google_product_category"] || "").toLowerCase();
  if (pt.includes("cumilánc") || pt.includes("cumilanc")) return "cumilanc";
  if (pt.includes("rágcsalánc") || pt.includes("ragcsalanc")) return "ragcsalanc";
  if (pt.includes("emlékőrz") || pt.includes("emleko")) return "emlekorzo-doboz";
  if (pt.includes("kulcstart")) return "kulcstarto";
  if (pt.includes("hónap") || pt.includes("honap")) return "honapkartya";
  if (pt.includes("mam") && pt.includes("cumi")) return "mam-cumi";
  if (pt.includes("mam") && (pt.includes("üveg") || pt.includes("uveg"))) return "mam-cumisuveg";
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

function normalizeItem(item) {
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
    availability: (item["g:availability"] || "").toLowerCase(), // in stock, out of stock
    personalizable: isPersonalizable(item),
    tags: collectTags(item)
  };
}

module.exports = { normalizeItem };

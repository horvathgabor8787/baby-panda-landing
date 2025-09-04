import Head from "next/head";
import { useState } from "react";
import GiftBuckets from "../components/GiftBuckets";

export default function Landing() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [meaning, setMeaning] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const res = await fetch("/data/names_with_meanings.json");
      const all = await res.json();
      const key = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      setMeaning(all[key] || "Különleges név, különleges történettel. Tedd örök emlékké egy névre szóló ajándékkal.");
    } catch {
      setMeaning("Különleges név, különleges történettel. Tedd örök emlékké egy névre szóló ajándékkal.");
    }
    setSubmitted(true);
    // GA4/Pix: name_submitted
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "name_submitted", source: "nevvarazs-landing", name: name.trim() });
    }
    // Supabase: /api/log-name – ha készen áll
    try {
      await fetch("/api/log-name", { method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ name: name.trim(), source: "nevvarazs-landing", category: "élmény-ajándék" })
      });
    } catch {}
  }

  const title = "Névre szóló babaajándék – Névvarázs | Baby Panda";
  const description = "Írd be a baba nevét, fedezd fel a jelentését, és válassz névre szóló cumiláncot, rágcsaláncot, emlékőrző dobozt. Prémium, egyedi ajándék.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://babypanda.hu/nevre-szolo-babaajandek" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://babypanda.hu/nevre-szolo-babaajandek" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center py-6">
          <h1 className="text-3xl md:text-5xl font-bold">Névvarázs ✨ – Névre szóló babaajándék</h1>
          <p className="mt-3 text-gray-700">Add meg a baba nevét, fedezd fel a jelentését, majd válassz az ajándékaink közül.</p>

          <form onSubmit={onSubmit} className="mt-6 flex gap-2 justify-center">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Írd be a baba nevét…"
              className="border rounded-xl px-4 py-3 w-72"
            />
            <button type="submit" className="rounded-xl px-5 py-3 text-white bg-black hover:opacity-90">Mutasd</button>
          </form>

          {submitted && (
            <div className="mt-6 max-w-2xl mx-auto text-lg">{name.trim()} – {meaning}</div>
          )}
        </header>

        {/* Ajándék-bucketek – MINDEN termék lefedve csoportokban */}
        <GiftBuckets bucketId="ujszulott-indulo" title="Újszülött induló 🎀" />
        <GiftBuckets bucketId="mindennapi" title="Mindennapi kedvencek 👶" />
        <GiftBuckets bucketId="keresztelo-premium" title="Keresztelő / különleges alkalom 💎" />
        <GiftBuckets bucketId="mini-meglepik" title="Mini meglepik ✨" />
        <GiftBuckets bucketId="mam-kedvencek" title="MAM kedvencek 🍼" />
        <GiftBuckets bucketId="top-ajanlatok" title="Top ajándékok ⭐" />
      </main>
    </>
  );
}

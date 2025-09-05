// pages/index.js
import Head from "next/head";
import Calculator from "../components/CalculatorEmbedIframe";

const SITE_URL = "https://babypanda.hu"; // kanonikus domain
const CANONICAL = SITE_URL + "/";        // ha nem a gyökér az útvonal, írd át

// FAQ + HowTo strukturált adatok (SEO)
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Mit tud a Baby Panda Névvarázs kalkulátor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Másodpercek alatt megtervezheted az egyedi, névre szóló cumiláncot vagy rágcsaláncot. Név, stílus és szín testreszabása azonnali előnézettel."
      }
    },
    {
      "@type": "Question",
      "name": "Kell külön app a kalkulátorhoz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nem. A kalkulátor közvetlenül ezen a landing oldalon érhető el, beágyazva."
      }
    },
    {
      "@type": "Question",
      "name": "Milyen termékekhez illeszkedik a Névvarázs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elsősorban névre szóló cumiláncokhoz és rágcsaláncokhoz; a koncepció bővíthető Hónapkártyára, Emlékőrző dobozokra és Egyedi kulcstartóra is."
      }
    }
  ]
};

const howtoLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Névre szóló cumilánc tervezése a Névvarázs kalkulátorral",
  "step": [
    { "@type": "HowToStep", "name": "Írd be a baba nevét", "text": "Add meg a nevet, ami a cumiláncon szerepel." },
    { "@type": "HowToStep", "name": "Válassz stílust és színeket", "text": "Állítsd be a stílust és a színkombinációt." },
    { "@type": "HowToStep", "name": "Ellenőrizd az előnézetet", "text": "Azonnal látod, hogyan néz ki a kész cumilánc." },
    { "@type": "HowToStep", "name": "Véglegesítés", "text": "Tedd kosárba a kiválasztott terméket." }
  ]
};

export default function Home() {
  const title = "Névre szóló cumilánc kalkulátor – Baby Panda";
  const description =
    "Prémium, gyors és látványos élmény: Névvarázs kalkulátor névre szóló cumilánc és rágcsalánc tervezéséhez. Luxus nude (#C29A8E) márkaélmény, SEO-barát landing.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:site_name" content="Baby Panda" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }} />
      </Head>

      <main className="relative min-h-screen overflow-x-hidden bg-page">
        {/* Háttér/halo */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-animate" />
          <div className="absolute inset-0 bg-vignette" />
          <div className="absolute left-1/2 top-[20%] -translate-x-1/2 h-[60vmin] w-[60vmin] rounded-full bg-brand/30 blur-[120px]" />
        </div>

        {/* HERO – kulcsszavas H1 */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-10 text-center sm:pt-24">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            Névvarázs: <span className="text-brand-strong">névre szóló cumilánc</span> és{" "}
            <span className="text-brand-strong">rágcsalánc</span> kalkulátor
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base text-white/80 sm:text-lg">
            Nem építünk új kalkulátort – a meglévőt ágyazzuk be. Ugyanaz a villámgyors, prémium élmény,
            a Baby Panda vizuális világával.
          </p>
          <div className="mt-8">
            <a href="#calculator" className="btn-primary">Indítás</a>
          </div>

          {/* Értékpontok */}
          <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 text-left">
            {[
              ["Luxus márkaélmény", "Glassmorphism, finom fények, nude árnyalat (#C29A8E)."],
              ["Villámgyors tervezés", "Azonnali előnézet, egyértelmű lépések, nulla súrlódás."],
              ["SEO-barát oldal", "Kulcsszavas H-címkék, FAQ/HowTo schema, tiszta kód."]
            ].map(([t, s]) => (
              <div key={t} className="glass-card p-5">
                <div className="text-sm uppercase tracking-wide text-white/60">Kiemelés</div>
                <div className="mt-1 text-lg font-medium text-white">{t}</div>
                <div className="mt-1 text-sm text-white/70">{s}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO tartalomblokk */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-10">
          <h2 className="section-title">Miért működik a Baby Panda megközelítés?</h2>
          <div className="glass-card p-6 leading-relaxed text-white/90">
            <p>
              A cél, hogy a látogató másodpercek alatt értse: <strong>névre szóló cumilánc</strong> és{" "}
              <strong>rágcsalánc</strong> személyre szabása nálunk gyors, esztétikus és élményközpontú.
              A landing nem zsúfolt; a fókusz a tervezésen és a vizuális minőségen van.
            </p>
            <p className="mt-3">
              Kapcsolódó témák: <strong>Emlékőrző dobozok</strong>, <strong>Hónapkártya</strong>,{" "}
              <strong>Egyedi kulcstartó</strong>, <strong>Rágóka</strong>, valamint a{" "}
              <strong>MAM cumik</strong> és <strong>MAM cumisüvegek</strong> mint kiegészítők.
              A kulcsszavakat természetes nyelven, duplikáció nélkül használjuk.
            </p>
          </div>
        </section>

        {/* Beágyazott kalkulátor */}
        <Calculator />

        {/* GYIK blokk (HTML) */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
          <h2 className="section-title">Gyakori kérdések</h2>
          <div className="glass-card p-6 text-white/90">
            <h3 className="font-semibold text-white">Miben különleges a Baby Panda élmény?</h3>
            <p className="mb-4">Prémium vizuál, gyors működés és érzelmi ajándékozási fókusz.</p>

            <h3 className="font-semibold text-white">Bővíthető más termékekre is?</h3>
            <p className="mb-4">
              Igen: Hónapkártya, Emlékőrző dobozok, Egyedi kulcstartó – a rendszer eleve így skálázható.
            </p>

            <h3 className="font-semibold text-white">Milyen eszközön működik jól?</h3>
            <p>Asztali és mobil nézeten egyaránt; az iframe reszponzív keretben fut.</p>
          </div>
        </section>
      </main>
    </>
  );
}

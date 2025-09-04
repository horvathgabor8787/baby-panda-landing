import Head from "next/head";

export default function Landing() {
  const title = "Névre szóló babaajándék – Névvarázs | Baby Panda";
  const description =
    "Írd be a baba nevét, fedezd fel a jelentését, és válassz névre szóló cumiláncot, rágcsaláncot, emlékőrző dobozt. Prémium, egyedi ajándék.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="canonical"
          href="https://babypanda.hu/nevre-szolo-babaajandek"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://babypanda.hu/nevre-szolo-babaajandek"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Névvarázs ✨ – Névre szóló babaajándék
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-700 mb-8">
          Add meg a baba nevét, fedezd fel a jelentését, és tedd örök
          emlékké egy személyre szabott ajándékkal 🎁
        </p>
        <a
          href="#"
          className="px-6 py-3 rounded-xl bg-brand text-white text-lg font-semibold hover:opacity-90 transition"
        >
          Mutasd az ajándékokat
        </a>
      </main>
    </>
  );
}

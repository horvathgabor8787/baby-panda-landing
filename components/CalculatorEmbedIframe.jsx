// components/CalculatorEmbedIframe.jsx
export default function CalculatorEmbedIframe() {
  const src = "https://nevvarazs.babypanda.hu";
  return (
    <section id="calculator" className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
      <h2 className="section-title">Névvarázs kalkulátor</h2>
      <div className="glass-card p-0 overflow-hidden">
        <iframe
          title="Névvarázs kalkulátor – Baby Panda"
          src={src}
          className="h-[860px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <noscript>A kalkulátor használatához engedélyezd a JavaScriptet.</noscript>
    </section>
  );
}

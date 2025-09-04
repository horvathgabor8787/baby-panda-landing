import useSWR from "swr";
import ProductCard from "./ProductCard";

const fetcher = (url) => fetch(url).then(r => r.json());

export default function GiftBuckets({ bucketId, title }) {
  const { data, error, isLoading } = useSWR(`/api/products?bucket=${bucketId}&limit=12`, fetcher, { revalidateOnFocus: false });

  if (error) return <section className="py-6"><h3 className="text-xl font-semibold">{title}</h3><p className="text-red-500">Hiba a betöltésben</p></section>;
  if (isLoading || !data) return <section className="py-6"><h3 className="text-xl font-semibold">{title}</h3><p>Betöltés…</p></section>;

  const items = data.items || [];
  if (!items.length) return null;

  return (
    <section className="py-6">
      <h3 className="text-xl md:text-2xl font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

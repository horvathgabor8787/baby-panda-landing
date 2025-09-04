export default function ProductCard({ p }) {
  return (
    <a href={p.url} target="_blank" rel="noreferrer" className="block border rounded-xl p-3 hover:shadow">
      <img src={p.image} alt={p.title} className="w-full h-44 object-cover rounded-md" loading="lazy" />
      <div className="mt-2 font-medium">{p.title}</div>
      <div className="text-sm text-gray-600 capitalize">{p.category.replace("-", " ")}</div>
      <div className="mt-1 font-semibold">
        {p.sale_price ? (
          <>
            <span className="line-through mr-2 text-gray-400">{p.price} Ft</span>
            <span>{p.sale_price} Ft</span>
          </>
        ) : (
          <span>{p.price} Ft</span>
        )}
      </div>
    </a>
  );
}

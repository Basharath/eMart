import { useSelector } from 'react-redux';

export default function Products() {
  const { products } = useSelector((state) => state.products);

  return (
    <div>
      {products?.map((p) => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}

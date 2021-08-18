import { useSelector } from 'react-redux';
import ProductCard from '../common/ProductCard';

export default function Products() {
  const { products } = useSelector((state) => state.products);

  return (
    <div className="d-flex">
      {products?.map((p) => (
        <ProductCard
          name={p.name}
          offer={p.offer}
          price={p.price}
          img={p.images[0]?.url}
          rating={2.5}
          classes="m-2"
          key={p._id}
        />
      ))}
    </div>
  );
}

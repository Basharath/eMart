// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../common/ProductCard';

export default function Products() {
  const { products } = useSelector((state) => state.products);

  return (
    <div className="d-flex flex-wrap justify-content-center justify-content-xl-start pb-5">
      {products?.map((p) => (
        <ProductCard
          name={p.name}
          offer={p.offer}
          price={p.price}
          img={p.images[0]?.url}
          classes="m-2"
          display
          height="345px"
          id={p._id}
          key={p._id}
        />
      ))}
    </div>
  );
}

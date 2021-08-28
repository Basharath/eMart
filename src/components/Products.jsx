// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../common/ProductCard';

export default function Products() {
  const { products } = useSelector((state) => state.products);

  return (
    <div className="d-flex flex-wrap justify-content-center justify-content-xl-start pb-5 products-wrapper">
      {products?.map((p) => (
        <ProductCard
          product={p}
          classes="m-2"
          height="345px"
          key={p._id}
          display
        />
      ))}
    </div>
  );
}

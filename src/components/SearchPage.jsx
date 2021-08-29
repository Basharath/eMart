import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../common/ProductCard';
import { getSearchedProducts } from '../actions/products';

export default function SearchPage() {
  const { searchProds } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const search = new URLSearchParams(useLocation().search).get('q') || '';

  useEffect(() => {
    if (!searchProds.length) dispatch(getSearchedProducts(search));
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center justify-content-xl-start pb-5 products-wrapper">
      {searchProds?.map((p) => (
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

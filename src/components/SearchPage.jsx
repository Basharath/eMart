import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProductCard from '../common/ProductCard';
import { getSearchedProducts } from '../actions/products';
import NotFound from './NotFound';

export default function SearchPage() {
  const { searchProds } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const search = new URLSearchParams(useLocation().search).get('q') || '';
  const [sortedProducts, setSortedProducts] = useState(searchProds);
  const [show, setShow] = useState(false);
  const [sortText, setSortText] = useState('');

  useEffect(() => {
    if (!searchProds.length) dispatch(getSearchedProducts(search));
  }, []);

  useEffect(() => {
    setSortedProducts(searchProds);
  }, [searchProds]);

  const priceLowToHigh = () => {
    const arr = [...sortedProducts];
    arr.sort((a, b) => a.offer - b.offer);
    setSortedProducts([...arr]);
    setSortText('Price (Low - High)');
  };

  const priceHighToLow = () => {
    const arr = [...sortedProducts];
    arr.sort((a, b) => b.offer - a.offer);
    setSortedProducts([...arr]);
    setSortText('Price (High - Low)');
  };

  const maxDiscount = () => {
    const arr = [...sortedProducts];
    arr.sort(
      (a, b) => (b.price - +b.offer) / b.price - (a.price - +a.offer) / a.price
    );
    setSortedProducts([...arr]);
    setSortText('Max. Discount');
  };

  const minDiscount = () => {
    const arr = [...sortedProducts];
    arr.sort(
      (a, b) => (a.price - +a.offer) / a.price - (b.price - +b.offer) / b.price
    );
    setSortedProducts([...arr]);
    setSortText('Min. Discount');
  };

  return (
    <>
      <div className="mt-3 m-2 d-flex justify-content-between align-items-center">
        <span
          className="inline-block ps-2"
          style={{ width: 'fitContent', whiteSpace: 'nowrap' }}
        >
          {searchProds?.length}{' '}
          {searchProds.length > 1 ? 'products' : 'product'} found
        </span>
        <div className="d-block w-100 ms-3 border-top border-secondary" />
        <NavDropdown
          title={sortText ? `${sortText}` : `Sort by`}
          renderMenuOnMount
          // className="inline text-end d-flex flex-column align-items-end pe-0 sort-dropdown"
          className="sort-dropdown"
          show={show}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <NavDropdown.Item onClick={priceLowToHigh}>
            Price low to high
          </NavDropdown.Item>
          <NavDropdown.Item onClick={priceHighToLow}>
            Price high to low
          </NavDropdown.Item>
          <NavDropdown.Item onClick={maxDiscount}>
            Max. discount
          </NavDropdown.Item>
          <NavDropdown.Item onClick={minDiscount}>
            Min. discount
          </NavDropdown.Item>
        </NavDropdown>
      </div>
      {!searchProds.length && <NotFound text="No products found :(" />}
      <div className="d-flex flex-wrap justify-content-center justify-content-xl-start pb-5 products-wrapper">
        {sortedProducts?.map((p) => (
          <ProductCard
            product={p}
            classes="m-2"
            height="345px"
            key={p._id}
            display
          />
        ))}
      </div>
    </>
  );
}

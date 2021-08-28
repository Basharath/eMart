import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const banners = [
  'https://res.cloudinary.com/cdnupload/image/upload/v1630146651/emart/banner-1_zhslyo.png',
  'https://res.cloudinary.com/cdnupload/image/upload/v1630146651/emart/banner-4_q0c3in.jpg',
  'https://res.cloudinary.com/cdnupload/image/upload/v1630146650/emart/banner-2_zmx6n7.jpg',
  'https://res.cloudinary.com/cdnupload/image/upload/v1630146650/emart/banner-3_i8ljx4.jpg',
];
export default function Banners() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="mb-3 mt-1">
      {banners.map((img, idx) => (
        <Carousel.Item key={idx} className="banner-container">
          <img
            className="banner-image d-block mx-auto"
            src={img}
            alt="First slide"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

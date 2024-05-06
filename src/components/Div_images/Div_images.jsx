import React, { useState, useEffect } from 'react';
import './Div_images.css';

const Div_images = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="image-container">
      <img src={images[index]} alt="Imagen" className="image"/>
    </div>
  );
};

export default Div_images;

import React, { useState, useEffect } from 'react';
import Carousel from './components/carousel';
import './index.css';

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=1&limit=10')
      .then((response) => response.json())
      .then((data) => {
        const imageUrls = data.map((item) => ({
          src: `https://picsum.photos/id/${item.id}/800/600`,
        }));
        setImages(imageUrls);
      });
  }, []);

  return (
    <div className="App">
      {images.length > 0 && <Carousel images={images} />}
    </div>
  );
};

export default App;
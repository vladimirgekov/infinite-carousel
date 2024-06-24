import React, { useEffect, useRef } from 'react';
import './carousel.css';

const Carousel = ({ images }) => {
    const carouselRef = useRef(null);

    const handleScroll = () => {
        const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;

        // Reset to start if scroll reaches the end
        if (scrollLeft + clientWidth >= scrollWidth) {
            carouselRef.current.style.scrollBehavior = 'auto';
            carouselRef.current.scrollLeft = 1;
        // Reset to end if scroll reaches the start
        } else if (scrollLeft === 0) {
            carouselRef.current.style.scrollBehavior = 'auto';
            carouselRef.current.scrollLeft = scrollWidth - clientWidth - 1;
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;

        // Reset smooth scrolling behavior after manual scroll adjustments
        const resetScrollBehavior = () => {
            carousel.style.scrollBehavior = 'smooth';
        };

        carousel.addEventListener('scroll', resetScrollBehavior);
        return () => {
            carousel.removeEventListener('scroll', resetScrollBehavior);
        };
    }, [images]);

    return (
        <div className="container">
            <div
                className="carousel"
                ref={carouselRef}
                onScroll={handleScroll} >
                {[...images, ...images, ...images].map((image, i) => (
                    <div key={i} className="carousel-item">
                        <img src={image.src} alt={`Carousel ${i}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;

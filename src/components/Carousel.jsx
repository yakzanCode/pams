import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';

const Carousel = ({ categories }) => {
    const sliderRef = useRef(null);

    const handleAfterChange = (current) => {
        const allVideos = document.querySelectorAll('.slick-slide video');

        allVideos.forEach((video) => {
            video.pause();
            video.currentTime = 0;
        });

        const currentSlide = document.querySelector('.slick-current video');

        if (currentSlide) {
            currentSlide
                .play()
                .then(() => console.log('▶️ Playing video at slide', current))
                .catch((err) => console.warn('Autoplay failed:', err));
        } else {
            console.warn('No current video found!');
        }
    };


    useEffect(() => {
        // Call after first mount to play initial video
        handleAfterChange();
    }, []);

    const sliderSettings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        centerPadding: '60px',
        arrows: true,
        afterChange: handleAfterChange, // 🔁 runs after each slide transition
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 5, centerPadding: '60px' } },
            { breakpoint: 1200, settings: { slidesToShow: 3, centerPadding: '120px' } },
            { breakpoint: 900, settings: { slidesToShow: 3, centerPadding: '30px' } },
            { breakpoint: 770, settings: { slidesToShow: 1, centerPadding: '200px' } },
            { breakpoint: 670, settings: { slidesToShow: 1, centerPadding: '150px' } },
            { breakpoint: 576, settings: { slidesToShow: 1, centerPadding: '100px' } },
        ],
    };

    return (
        <Slider {...sliderSettings} ref={sliderRef}>
            {categories.map((cat, idx) => (
                <div key={idx} className="text-center">
                    <div className="category-slide mx-2 rounded-3 d-flex flex-column">
                        <video
                            src={cat.vid}
                            className="rounded-3 w-100"
                            style={{ objectFit: 'cover', height: '100%' }}
                            muted
                            loop
                            playsInline
                            preload="auto"
                        />
                        <div className="card mt-auto w-100">
                            <div className="row g-0 p-1 h-100">
                                <div className="col-3 h-100">
                                    <img src={cat.image} alt="..." className="w-75 h-100 rounded-start" style={{ objectFit: 'cover' }} />
                                </div>
                                <div className="col-9 h-100">
                                    <div className="fw-bold h-100 text-start" style={{ fontSize: '10px' }}>
                                        <p>{cat.name}</p>
                                        <p>14$</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default Carousel;

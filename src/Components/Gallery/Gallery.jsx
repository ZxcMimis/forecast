import React from 'react';
import './Gallery.scss';
import { Container } from '../Container/Container';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import sliderOne from '../../img/slider-1.webp';
import sliderTwo from '../../img/slider-2.webp';
import sliderThree from '../../img/slider-3.webp';
import sliderFour from '../../img/slider-4.webp';
import sliderFive from '../../img/slider-5.jpg';

export const Gallery = () => {
    const slides = [sliderFour, sliderFive, sliderOne, sliderTwo, sliderThree];

    return (
        <section className='gallery'>
            <Container>
                <h1 className='gallery__title'>Beautiful nature</h1>
                
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    className="gallery__swiper"
                >
                    {slides.map((img, index) => (
                        <SwiperSlide key={index} className="gallery__item">
                            <img src={img} alt={`Nature ${index}`} className="gallery__slider" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </section>
    );
};
import './Gallery.scss';
import { Container } from '../Container/Container';
import sliderOne from '../../img/slider-1.webp'
import sliderTwo from '../../img/slider-2.webp'
import sliderThree from '../../img/slider-3.webp'
import sliderFour from '../../img/slider-4.webp'
import sliderFive from '../../img/slider-5.jpg'

export const Gallery = () => {
    return (
        <section className='gallery'>
            <Container>
                <h1>Beautiful nature</h1>
                <ul className='gallery__list'>
                    <li className="gallery__item">
                        <img src={sliderThree} alt="#" className="gallery__slider" />
                    </li>
                    <li className="gallery__item">
                        <img src={sliderTwo} alt="#" className="gallery__slider" />
                    </li>
                    <li className="gallery__item">
                        <img src={sliderOne} alt="#" className="gallery__slider" />
                    </li>
                    <li className="gallery__item">
                        <img src={sliderFour} alt="#" className="gallery__slider" />
                    </li>
                    <li className="gallery__item">
                        <img src={sliderFive} alt="#" className="gallery__slider" />
                    </li>
                </ul>
            </Container>
        </section>
    )
}
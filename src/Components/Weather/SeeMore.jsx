import { Container } from '../Container/Container';
import './SeeMore.scss'
import temp from '../../img/thermometer.webp'
import rain from '../../img/rain.webp'
import pressure from '../../img/pressure.webp'
import wind from '../../img/wind.webp'
import visibility from '../../img/Visibility.webp'

export const SeeMore = () => {
    return (
        <section className="see">
            <Container>
                <ul className="see__list">
                    <li className="see__item">
                        <h2 className='see__title-card'>Feels like</h2>
                        <p className='see__subtitle-card'>29.2℃</p>
                        <img className='see__img-card' src={temp} alt="#" />
                    </li>
                    <li className="see__item">
                        <h2 className='see__title-card'>Min ℃</h2>
                        <p className='see__subtitle-card'>27.9℃</p>
                        <h2 className='see__title-card'>Max ℃</h2>
                        <p className='see__subtitle-card'>27.9℃</p>
                    </li>
                    <li className="see__item">
                        <h2 className='see__title-card'>Humidity</h2>
                        <p className='see__subtitle-card'>59%</p>
                        <img className='see__img-card' src={rain} alt="#" />
                    </li>
                    <li className="see__item">
                        <h2 className='see__title-card'>Pressure</h2>
                        <p className='see__subtitle-card'>1007 Pa</p>
                        <img className='see__img-card' src={pressure} alt="#" />
                    </li>
                    <li className="see__item">
                        <h2 className='see__title-card'>Wind speed</h2>
                        <p className='see__subtitle-card'>3.17 m/s</p>
                        <img className='see__img-card' src={wind} alt="#" />
                    </li>
                    <li className="see__item">
                        <h2 className='see__title-card'>Visibility</h2>
                        <p className='see__subtitle-card'>Unlimited</p>
                        <img className='see__img-card' src={visibility} alt="#" />
                    </li>
                </ul>
            </Container>

        </section>
    )
}
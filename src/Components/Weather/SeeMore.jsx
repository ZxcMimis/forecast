import { Container } from '../Container/Container';
import './SeeMore.scss'
import temp from '../../img/thermometer.webp'
import rain from '../../img/rain.webp'
import pressure from '../../img/pressure.webp'
import wind from '../../img/wind.webp'
import visibility from '../../img/Visibility.webp'

export const SeeMore = ({ data }) => {
    
if (!data || !data.main) return null;

    return (
        <section className="see">
            <Container>
                <ul className="see__list">
                    <li className="see__item">
                        <h2 className='see__title-card'>Feels like</h2>
                        <p className='see__subtitle-card'>{Math.round(data.main.feels_like)}℃</p>
                        <img className='see__img-card' src={temp} alt="Temperature" />
                    </li>
                    <li className="see__item">
                        <h2 className='see__title-card'>Min ℃</h2>
                        <p className='see__subtitle-card'>{Math.round(data.main.temp_min)}℃</p>
                        <h2 className='see__title-card'>Max ℃</h2>
                        <p className='see__subtitle-card'>{Math.round(data.main.temp_max)}℃</p>
                    </li>
                    <li className="see__item">
                        <h2 className='see__title-card'>Humidity</h2>
                        <p className='see__subtitle-card'>{data.main.humidity}%</p>
                        <img className='see__img-card' src={rain} alt="Humidity" />
                    </li>
                    <li className="see__item">
                        <h2 className='see__title-card'>Pressure</h2>
                        <p className='see__subtitle-card'>{data.main.pressure} hPa</p>
                        <img className='see__img-card' src={pressure} alt="Pressure" />
                    </li>
                    <li className="see__item">
                        <h2 className='see__title-card'>Wind speed</h2>
                        <p className='see__subtitle-card'>{data.wind.speed} m/s</p>
                        <img className='see__img-card' src={wind} alt="Wind" />
                    </li>
                    <li className="see__item">
                        <h2 className='see__title-card'>Visibility</h2>
                        <p className='see__subtitle-card'>
                            {data.visibility >= 10000 ? 'Unlimited' : `${data.visibility / 1000} km`}
                        </p>
                        <img className='see__img-card' src={visibility} alt="Visibility" />
                    </li>
                </ul>
            </Container>
        </section>
    )
}
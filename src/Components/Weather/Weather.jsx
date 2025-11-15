import './Weather.scss'
import { Container } from '../Container/Container';
import sunIcon from '../../img/sub.webp'

export const Weather = () => {
    return (
        
        <section className="weather">
    <Container>
        <ul className="weather__list">
            <li className="weather__card">
                <div className="weather__header">
                    <span className="weather__city">Prague</span>
                    <span className="weather__country">Czech Republic</span>
                </div>
                <div className="weather__time">14:00</div>
                <div className="weather__buttons">
                    <button className="weather__btn__one">Hourly forecast</button>
                    <button className="weather__btn__one">Weekly forecast</button>
                </div>
                <div className="weather__date">13.10.2023 | Friday</div>
                <div className="weather__icon-wrap">
                    <img className='weather__icon' src={sunIcon} alt="Иконка солнца" />
                </div>
                <div className="weather__temp">22°C</div>
                <div className="weather__footer">
                    <div className="weather__footer-left">
                        {/* <svg className='weather__icon-update'>
                            <use href=''>#</use>
                        </svg> */}
                        {/* <svg className='weather__icon-heart'>
                            <use href=''>#</use>
                        </svg> */}
                    </div>
                    <button className="weather__btn ">See more</button>
                    {/* <svg className='weather__icon-trash'>
                        <use href=''>#</use>
                    </svg> */}
                </div>
            </li>

            <li className="weather__card">
                <div className="weather__header">
                    <span className="weather__city">Prague</span>
                    <span className="weather__country">Czech Republic</span>
                </div>
                <div className="weather__time">14:00</div>
                <div className="weather__buttons">
                    <button className="weather__btn__one">Hourly forecast</button>
                    <button className="weather__btn__one">Weekly forecast</button>
                </div>
                <div className="weather__date">13.10.2023 | Friday</div>
                <div className="weather__icon-wrap">
                    <img className='weather__icon' src={sunIcon} alt="Иконка солнца" />
                </div>
                <div className="weather__temp">22°C</div>
                <div className="weather__footer">
                    <div className="weather__footer-left">
                        {/* ... svg icons ... */}
                    </div>
                    <button className="weather__btn ">See more</button>
                    {/* ... svg icons ... */}
                </div>
            </li>

            <li className="weather__card">
                <div className="weather__header">
                    <span className="weather__city">Prague</span>
                    <span className="weather__country">Czech Republic</span>
                </div>
                <div className="weather__time">14:00</div>
                <div className="weather__buttons">
                    <button className="weather__btn__one">Hourly forecast</button>
                    <button className="weather__btn__one">Weekly forecast</button>
                </div>
                <div className="weather__date">13.10.2023 | Friday</div>
                <div className="weather__icon-wrap">
                    <img className='weather__icon' src={sunIcon} alt="Иконка солнца" />
                </div>
                <div className="weather__temp">22°C</div>
                <div className="weather__footer">
                    <div className="weather__footer-left">
                        {/* ... svg icons ... */}
                    </div>
                    <button className="weather__btn ">See more</button>
                    {/* ... svg icons ... */}
                </div>
            </li>

        </ul>
    </Container>
</section>
        
    )
}
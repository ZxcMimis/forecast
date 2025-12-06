import { Container } from '../Container/Container';
import './Prediction.scss'
import few from '../../img/few.webp'
import scattered from '../../img/scattered.webp'
import overcast from '../../img/overcast.webp'
import sunny from '../../img/sunny.webp'
import rain from '../../img/rain.webp'


export const Prediction = () => {
    return (
        <section className="prediction">
            <Container>
                <ul className="prediction__list">
                    <li className='prediction__item'>
                        <p className="prediction__date">Fri, Oct 13</p>

                        <div className='prediction__weather-group'>
                            <img className='prediction__img' src={rain} alt="#" />
                            <p className='prediction__temp'>23/14℃</p>
                        </div>

                        <p className='prediction__desc'>light rain</p>
                    </li>
                    <li className='prediction__item'>
                        <p className="prediction__date">Sat, Oct 14</p>

                        <div className='prediction__weather-group'>
                            <img className='prediction__img' src={rain} alt="#" />
                            <p className='prediction__temp'>22/10℃</p>
                        </div>

                        <p className='prediction__desc'>light rain</p>
                    </li>
                    <li className='prediction__item'>
                        <p className="prediction__date">Sun, Oct 15</p>

                        <div className='prediction__weather-group'>
                            <img className='prediction__img' src={rain} alt="#" />
                            <p className='prediction__temp'>13/6℃</p>
                        </div>

                        <p className='prediction__desc'>light rain</p>
                    </li>
                    <li className='prediction__item'>
                        <p className="prediction__date">Mon, Oct 16</p>
                        <div className='prediction__weather-group'>
                            <img className='prediction__img' src={few} alt="#" />
                            <p className='prediction__temp'>12/4℃</p>
                        </div>

                        <p className='prediction__desc'>few clouds</p>
                    </li>
                    <li className='prediction__item'>
                        <p className="prediction__date">Tue, Oct 17</p>

                        <div className='prediction__weather-group'>
                            <img className='prediction__img' src={overcast} alt="#" />
                            <p className='prediction__temp'>12/4℃</p>
                        </div>

                        <p className='prediction__desc'>overcast clouds</p>
                    </li>
                    <li className='prediction__item'>
                        <p className="prediction__date">Wed, Oct 18</p>

                        <div className='prediction__weather-group'>
                            <img className='prediction__img' src={sunny} alt="#" />
                            <p className='prediction__temp'>13/3℃</p>
                        </div>

                        <p className='prediction__desc'>clear sky</p>
                    </li>
                    <li className='prediction__item'>
                        <p className="prediction__date">Thu, Oct 19</p>

                        <div className='prediction__weather-group'>
                            <img className='prediction__img' src={overcast} alt="#" />
                            <p className='prediction__temp'>12/5℃</p>
                        </div>

                        <p className='prediction__desc'>overcast clouds</p>
                    </li>
                    <li className='prediction__item'>
                        <p className="prediction__date">Fri, Oct 20</p>

                        <div className='prediction__weather-group'>
                            <img className='prediction__img' src={scattered} alt="#" />
                            <p className='prediction__temp'>9/3℃</p>
                        </div>

                        <p className='prediction__desc'>scattered clouds</p>
                    </li>
                </ul>
            </Container>

        </section>
    )
}
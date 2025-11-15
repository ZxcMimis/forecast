import './Articles.scss';
import { Container } from '../Container/Container';
import one from '../../img/one.webp'
import two from "../../img/two.webp"
import three from "../../img/three.webp"
import four from "../../img/four.webp"

export const Articles = () => {
    return(
        <section className='articles'>
            <Container>
            <h1 className='articles__title'>Interacting with our pets</h1>
            <ul className='articles__list'>
                <li className="articles__item">
                    <img className='articles__img' src={one} alt="#" />
                    <p className='articles__info'>Rescue pups pose as ghosts in festive photo shoot</p>
                </li>
                <li className="articles__item">
                    <img className='articles__img' src={two} alt="#" />
                    <p className='articles__info'>Cat interrupts morning coffee on sunny Washington morning</p>
                </li>
                <li className="articles__item">
                    <img className='articles__img' src={three} alt="#" />
                    <p className='articles__info'>New study finds dogs pay more attention to women</p>
                </li>
                <li className="articles__item">
                    <img className='articles__img' src={four} alt="#" />
                    <p className='articles__info'>Petting dogs gives health benefit, even if they are not </p>
                </li>
            </ul>
            <button className='articles__btn'>See more</button>
            </Container>
        </section>
    )
}
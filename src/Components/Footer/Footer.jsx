import './Footer.scss';
import { Container } from '../Container/Container';

import insta from '../../img/insta.webp'
import facebook from '../../img/facebook.webp'
import whatsapp from '../../img/whatsapp.webp'
import logo from "../../img/logo.png"

export const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <div className="footer__box">
                <div className='footer__logo-box'>
                    <a href="" className="footer__logo-a">
                        <img src={logo} alt="#" className="footer__logo-img" />
                    </a>
                </div>
                <div className="footer__addressa-box">
                    <h2 className='footer__addressa-title'>Address</h2>
                    <p className="footer__addressa-subtitle">
                        Svobody str. 35
                        <br/>
                        Kyiv
                        <br/>
                        Ukraine
                    </p>
                </div>

                <div className="footer__link-box">
                    <h2 className="footer__link-title">Contact us</h2>
                    <div className="footer__social-icons">
                    <a href="" className="footer__inst">
                        <img className='footer__inst-link' src={insta} alt='#'></img>
                    </a>
                    <a href="" className="footer__facebook">
                        <img className='footer__facebook-link' src={facebook} alt='#'></img>
                    </a>
                    <a href="" className="footer__whatsapp">
                        <img className='footer__whatsapp-link' src={whatsapp} alt='#'></img>
                    </a>
                    </div>
                </div>
                </div>
            </Container>
        </footer>
    )
}
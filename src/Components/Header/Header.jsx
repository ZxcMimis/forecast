import './Header.scss';
import logo from "../../img/logo.png"
import user from "../../img/user.png"
export const Header = () => {
    return (
        <header class="header">
            <div class="header__box">
                <a href="#" class="header__logo">
                    <img src={logo} alt="#" />
                </a>

                <nav class="header__nav">
                    <ul class="header__nav-list">
                        <li class="header__nav-item"><a href="#" class="header__nav-link">Who we are</a></li>
                        <li class="header__nav-item"><a href="#" class="header__nav-link">Contacts</a></li>
                        <li class="header__nav-item"><a href="#" class="header__nav-link">Menu</a></li>
                    </ul>
                </nav>

                <div class="header__user">
                    <button class="header__sign-up-button">Sign Up</button>
                    <img src={user} alt="#" />
                </div>
            </div>
        </header>
    )
}
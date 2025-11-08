import './Header.scss';
import logo from "../../img/logo.png"
import user from "../../img/user.png"
export const Header = () => {
    return (
        <header class="main-header">
            <div class="header-content">
                <a href="#" class="logo">
                    <img src={logo} alt="#" />
                </a>

                <nav class="main-nav">
                    <ul class="nav-list">
                        <li class="nav-item"><a href="#" class="nav-link">Who we are</a></li>
                        <li class="nav-item"><a href="#" class="nav-link">Contacts</a></li>
                        <li class="nav-item"><a href="#" class="nav-link">Menu</a></li>
                    </ul>
                </nav>

                <div class="user-actions">
                    <button class="sign-up-button">Sign Up</button>
                    <img src={user} alt="#" />
                </div>
            </div>
        </header>
    )
}
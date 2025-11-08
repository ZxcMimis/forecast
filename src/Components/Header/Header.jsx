import './Header.scss';

export const Header = () => {
    return (
    <header class="main-header">
    <div class="header-content">
        <a href="#" class="logo">
            <div class="logo-box">
                <span class="logo-text">24/7</span>
                <span class="logo-subtitle">forecast</span>
            </div>
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
            <div class="user-avatar" aria-label="Профіль користувача"></div>
        </div>
    </div>
</header>
    )
}
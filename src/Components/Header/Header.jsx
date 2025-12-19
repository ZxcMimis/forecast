import React, { useState } from 'react';
import './Header.scss';
import '../reset/reset.scss'
import { Container } from '../Container/Container';
import logo from "../../img/logo.png"
import userImg from "../../img/user.png"
import { Button, Drawer, message, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export const Header = ({ isRegistered, user, onAuthSuccess, onLogout, isModalOpen, setIsModalOpen }) => {
    const [open, setOpen] = useState(false);
    const [authMode, setAuthMode] = useState('signup');
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);
    
    const showModal = () => {
        setError('');
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setError('');
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (error) setError('');
    };

    const handleLogoutClick = () => {
        onLogout();
        message.info('You have logged out.');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://69219d19512fb4140be0c524.mockapi.io/users');
            const users = await response.json();
            const foundUser = users.find(u => u.email === formData.email && u.password === formData.password);

            if (foundUser) {
                onAuthSuccess(foundUser);
                setFormData({ username: '', email: '', password: '' });
                setError('');
            } else {
                setError('Невірний пароль або логін!');
            }
        } catch (err) {
            setError('Помилка сервера. Спробуйте пізніше.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const checkRes = await fetch('https://69219d19512fb4140be0c524.mockapi.io/users');
            const users = await checkRes.json();

            const emailExists = users.some(u => u.email.toLowerCase() === formData.email.toLowerCase());
            const userExists = users.some(u => u.username.toLowerCase() === formData.username.toLowerCase());

            if (emailExists) {
                setError('Ця пошта вже використовується!');
                return;
            }

            if (userExists) {
                setError('Цей логін вже використовується!');
                return;
            }

            const response = await fetch('https://69219d19512fb4140be0c524.mockapi.io/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                onAuthSuccess(data);
                setFormData({ username: '', email: '', password: '' });
                setError('');
            }
        } catch (err) {
            setError('Помилка сервера.');
        }
    };

    const toggleAuthMode = (e) => {
        e.preventDefault();
        setError('');
        setAuthMode(authMode === 'signup' ? 'login' : 'signup');
    };

    const DesktopUserSection = () => {
        if (isRegistered && user) {
            return (
                <div className="header__user">
                    <span className="header__user-name-desktop">{user.username || user.name}</span>
                    <button onClick={handleLogoutClick} className="header__logout-btn">Log out</button>
                    <img src={userImg} alt="User" className="header__user-avatar-desktop" />
                </div>
            );
        }
        return (
            <div className="header__user">
                <button className="header__sign-up-button" onClick={showModal}>Sign Up</button>
            </div>
        );
    };

    return (
        <header className="header">
            <Container>
                <div className="header__box">
                    <a href="#" className="header__logo"><img src={logo} alt="Logo" /></a>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            <li className="header__nav-item"><a href="#" className="header__nav-link">Who we are</a></li>
                            <li className="header__nav-item"><a href="#" className="header__nav-link">Contacts</a></li>
                            <li className="header__nav-item"><a href="#" className="header__nav-link">Menu</a></li>
                        </ul>
                    </nav>
                    
                    <DesktopUserSection />

                    <div className='header__menu-box'>
                        <Button type="text" onClick={showDrawer} style={{ fontSize: '16px', fontWeight: '500' }}>
                            Menu {open ? 'v' : '>'}
                        </Button>
                        <Drawer placement="top" closable={true} onClose={onClose} open={open} height="auto" className="header__drawer">
                            <div className="header__drawer-content">
                                <ul className='header__menu-list menu'>
                                    <li className="header__menu-item"><a href="#" className="header__menu-link">Who we are</a></li>
                                    <li className="header__menu-item"><a href="#" className="header__menu-link">Contacts</a></li>
                                    <li className="header__menu-item"><a href="#" className="header__menu-link">Menu</a></li>
                                </ul>
                                <div className="header__user menu">
                                    {isRegistered && user ? (
                                        <>
                                            <img src={userImg} alt="User" className="header__user-avatar-img" />
                                            <span className="header__user-name">{user.username || user.name}</span>
                                            <button onClick={handleLogoutClick} className="header__logout-btn menu">Log out</button>
                                        </>
                                    ) : (
                                        <button className="header__sign-up-button menu" onClick={() => { onClose(); showModal(); }}>Sign In / Up</button>
                                    )}
                                </div>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </Container>

            <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered width={450} className="header__modal">
                <form className="header__modal-form" onSubmit={authMode === 'signup' ? handleRegister : handleLogin}>
                    <h2 className="header__modal-title">{authMode === 'signup' ? 'Sign up' : 'Log In'}</h2>
                    
                    {error && (
                        <div className="header__modal-error">
                            {error}
                        </div>
                    )}

                    {authMode === 'signup' && (
                        <div className="header__modal-group">
                            <label className="header__modal-label">Username</label>
                            <input type="text" name="username" className="header__modal-input" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
                        </div>
                    )}
                    <div className="header__modal-group">
                        <label className="header__modal-label">E-Mail</label>
                        <input type="email" name="email" className="header__modal-input" placeholder="E-Mail" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="header__modal-group">
                        <label className="header__modal-label">Password</label>
                        <input type="password" name="password" className="header__modal-input" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                    </div>
                    <button type="submit" className="header__modal-btn">{authMode === 'signup' ? 'Sign up' : 'Log In'}</button>
                    <p className="header__modal-footer">
                        {authMode === 'signup' ? 'Already have an account? ' : 'Don\'t have an account? '}
                        <a className='header__modal-footer-a' href="#" onClick={toggleAuthMode}>{authMode === 'signup' ? 'Log In' : 'Sign Up'}</a>
                    </p>
                </form>
            </Modal>
        </header>
    )
}
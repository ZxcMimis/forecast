import React, { useState } from 'react';
import './Header.scss';
import '../reset/reset.scss'
import { Container } from '../Container/Container';
import logo from "../../img/logo.png"
import userImg from "../../img/user.png"
import { Button, Drawer, message, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export const Header = ({ isRegistered, user, onAuthSuccess, onLogout }) => {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('signup');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                message.success('Welcome back!');
                onAuthSuccess(foundUser);
                setIsModalOpen(false);
                setFormData({ username: '', email: '', password: '' });
            } else {
                message.error('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Server error.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://69219d19512fb4140be0c524.mockapi.io/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                message.success('Account created successfully!');
                onAuthSuccess(data);
                setIsModalOpen(false);
                setFormData({ username: '', email: '', password: '' });
            } else {
                message.error('Registration failed. Try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Server error.');
        }
    };

    const toggleAuthMode = (e) => {
        e.preventDefault();
        setAuthMode(authMode === 'signup' ? 'login' : 'signup');
    };

    const DrawerUserSection = () => {
        if (isRegistered && user) {
            return (
                <div className="header__user menu">
                    <img src={userImg} alt="User" className="header__user-avatar-img" />
                    <span className="header__user-name">{user.username || user.name}</span>
                    <span onClick={handleLogoutClick} className="header__user-logout">Log out</span>
                </div>
            );
        }
        return (
            <div className="header__user menu">
                <button
                    className="header__sign-up-button menu"
                    onClick={() => { onClose(); showModal(); }}
                >
                    Sign In / Up
                </button>
            </div>
        );
    };

    const DesktopUserSection = () => {
        if (isRegistered && user) {
            return (
                <div className="header__user">
                    <span className="header__user-name-desktop">{user.username || user.name}</span>
                    <span onClick={handleLogoutClick} className="header__user-logout-desktop">Log out</span>
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
                    <a href="#" className="header__logo">
                        <img src={logo} alt="Logo" />
                    </a>

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

                        <Drawer
                            placement="top"
                            closable={true}
                            closeIcon={<CloseOutlined style={{ fontSize: '20px', color: '#000' }} />}
                            onClose={onClose}
                            open={open}
                            height="auto"
                            className="header__drawer"
                        >
                            <div className="header__drawer-content">
                                <ul className='header__menu-list menu'>
                                    <li className="header__menu-item"><a href="#" className="header__menu-link">Who we are</a></li>
                                    <li className="header__menu-item"><a href="#" className="header__menu-link">Contacts</a></li>
                                    <li className="header__menu-item"><a href="#" className="header__menu-link">Menu</a></li>
                                </ul>

                                <DrawerUserSection />
                            </div>
                        </Drawer>
                    </div>
                </div>
            </Container>

            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                centered
                width={450}
                className="header__modal"
            >
                <form className="header__modal-form" onSubmit={authMode === 'signup' ? handleRegister : handleLogin}>
                    <h2 className="header__modal-title">
                        {authMode === 'signup' ? 'Sign up' : 'Log In'}
                    </h2>
                    
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
                    
                    <button type="submit" className="header__modal-btn">
                        {authMode === 'signup' ? 'Sign up' : 'Log In'}
                    </button>
                    
                    <p className="header__modal-footer">
                        {authMode === 'signup' ? 'Already have an account? ' : 'Don\'t have an account? '}
                        <a className='header__modal-footer-a' href="#" onClick={toggleAuthMode}>
                            {authMode === 'signup' ? 'Log In' : 'Sign Up'}
                        </a>
                    </p>
                </form>
            </Modal>
        </header>
    )
}
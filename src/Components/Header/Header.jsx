import './Header.scss';
import '../reset/reset.scss'
import { Container } from '../Container/Container';
import logo from "../../img/logo.png"
import userImg from "../../img/user.png"
import React, { useState } from 'react';
import { Button, Drawer, theme, Modal, message } from 'antd';

export const Header = () => {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);





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

                    <div className="header__user">
                        <button className="header__sign-up-button" onClick={showModal}>Sign Up</button>
                        <img src={userImg} alt="User" />
                    </div>

                    <div className='header__menu-box'>
                        <div>
                            <Button type="primary" onClick={showDrawer}>Menu</Button>
                        </div>
                        <Drawer
                            placement="right"
                            closable={false}
                            onClose={onClose}
                            open={open}
                            getContainer={false}
                        >
                            <ul className='header__menu-list'>
                                <li className="header__menu-item"><a href="#" className="header__menu-link">Who we are</a></li>
                                <li className="header__menu-item"><a href="#" className="header__menu-link">Contacts</a></li>
                                <li className="header__menu-item"><a href="#" className="header__menu-link">Menu</a></li>
                            </ul>
                            <div className="header__user menu">
                                <button className="header__sign-up-button menu" onClick={() => { onClose(); showModal(); }}>Sign Up</button>
                                <img src={userImg} alt="User" />
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
                <form className="header__modal-form">
                    <h2 className="header__modal-title">Sign up</h2>
                    
                    <div className="header__modal-group">
                        <label className="header__modal-label">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            className="header__modal-input"
                            placeholder="Username" 
                            value={formData.username}
                            required
                        />
                    </div>

                    <div className="header__modal-group">
                        <label className="header__modal-label">E-Mail</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="header__modal-input"
                            placeholder="E-Mail" 
                            value={formData.email}
                            required
                        />
                    </div>

                    <div className="header__modal-group">
                        <label className="header__modal-label">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="header__modal-input"
                            placeholder="Password" 
                            value={formData.password}
                            required
                        />
                    </div>

                    <button type="submit" className="header__modal-btn">Sign up</button>
                    
                    <p className="header__modal-footer">
                        Already have an account? <a className='header__modal-footer-a' href="#">Log In</a>
                    </p>
                </form>
            </Modal>
        </header>
    )
}
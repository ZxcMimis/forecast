import './Header.scss';
import '../reset/reset.scss'
import { Container } from '../Container/Container';
import logo from "../../img/logo.png"
import user from "../../img/user.png"
import React, { useState } from 'react';
import { Button, Drawer, theme } from 'antd';
export const Header = () => {

    const { token } = theme.useToken();
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    return (

        <header class="header">
            <Container>
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


                    <div className='header__menu-box' >
                        <div>
                            <Button type="primary" onClick={showDrawer}>
                                Open
                            </Button>
                        </div>
                        <Drawer
                            placement="right"
                            closable={false}
                            onClose={onClose}
                            open={open}
                            getContainer={false}
                        >
                            <ul className='header__menu-list'>
                                <li className="header__menu-item">
                                    <a href="#" className="header__menu-link">Who we are</a>
                                </li>
                                <li className="header__menu-item">
                                    <a href="#" className="header__menu-link">Contacts</a>
                                </li>
                                <li className="header__menu-item">
                                    <a href="#" className="header__menu-link">Menu</a>
                                </li>
                            </ul>

                            <div class="header__user menu">
                                <button class="header__sign-up-button menu">Sign Up</button>
                                <img src={user} alt="#" />
                            </div>
                        </Drawer>
                    </div>

                </div>
            </Container>
        </header>

    )
}
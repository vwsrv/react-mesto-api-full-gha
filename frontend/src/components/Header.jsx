/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from 'react-router-dom'
import headerLogo from '../images/header-logo.svg'
import { Routes, Route } from "react-router-dom";

export default function Header({ onSignOut, email }) {
    const [isActiveMenu, setIsActiveMenu] = useState(false);

    function handleOpenHeaderMenu() {
        setIsActiveMenu(!isActiveMenu)
    }

    function handleLogOut() {
        setIsActiveMenu(false);
        onSignOut();
    }

    return (
        <header className={isActiveMenu ? "header header_type-mobile" : "header"}>
            <img src={headerLogo}
                alt="Лого"
                className="header__logo" />
            <Routes>
                <Route path="/" element={
                    <div>
                        <div className={isActiveMenu ? 'header__container header__container_type-mobile' : 'header__container'}>
                            <p className="header__user-email">{email}</p>
                            <NavLink to='/signin' className="header__button" onClick={handleLogOut}>Выйти</NavLink>
                        </div>
                        <button className={isActiveMenu ? "header__menu header__menu_active" : 'header__menu'}
                            onClick={handleOpenHeaderMenu}>
                            <span className="header__menu-line"></span>
                            <span className="header__menu-line"></span>
                            <span className="header__menu-line"></span>
                        </button>
                    </div>
                } />
                <Route path="/signin" element={
                    <NavLink to='/signup' className="header__button_active">Регистрация</NavLink>} />
                <Route path="/signup" element={
                    <NavLink to='/signin' className="header__button_active">Войти</NavLink>} />
            </Routes>
        </header>
    );
}
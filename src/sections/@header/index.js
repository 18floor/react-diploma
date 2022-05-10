import React from 'react';
import {NavLink} from 'react-router-dom';
import clsx from 'clsx';
import headerLogo from '../../img/header-logo.png';
import NavbarMain from '../../components/HeaderMenu';

const Header = () => {


    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <NavLink className="navbar-brand" to="/">
                            <img src={headerLogo} alt="Bosa Noga"/>
                        </NavLink>

                        <div className="collapse navbar-collapse" id="navbarMain">
                            <NavbarMain/>
                            <div>
                                <div className="header-controls-pics">
                                    <div
                                        data-id="search-expander"
                                        className="header-controls-pic header-controls-search"
                                    />

                                    <div
                                        className="header-controls-pic header-controls-cart"
                                    >
                                       <div className="header-controls-cart-full">
                                                10
                                            </div>

                                        <div className="header-controls-cart-menu"/>
                                    </div>
                                </div>
                                <form
                                    data-id="search-form"
                                    className={clsx(
                                        'header-controls-search-form',
                                        'form-inline')}
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <input
                                        className="form-control"
                                        placeholder="Поиск"
                                        value=""
                                    />
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
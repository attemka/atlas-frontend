import React, { Component } from 'react';
import './header-appbar.scss';
import { connect } from 'react-redux';

class HeaderAppbar extends Component {
    render() {
        const { isLogged, userName, isAdmin } = this.props;
        const mainComponent = isLogged ? (
            <ul className="pure-menu-list">
                <li className="pure-menu-item header-btn">
                    <a href="/" className="pure-menu-link header-btn">
                        Заявки
                    </a>
                </li>
                <li className="pure-menu-item header-btn">
                    <a href="/" className="pure-menu-link header-btn">
                        Инструменты
                    </a>
                </li>
            </ul>
        ) : null;
        const rightComponents = isLogged ? (
            <ul className="pure-menu-list login-ul">
                <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover header-btn">
                    <a href="/" className="pure-menu-link header-btn">
                        {userName}
                    </a>
                    <ul className="pure-menu-children">
                        <li className="pure-menu-item">
                            <a href="/" className="pure-menu-link">
                                Управление аккаунтом
                            </a>
                        </li>
                        {isAdmin ? (
                            <li className="pure-menu-item">
                                <a href="/" className="pure-menu-link">
                                    Управление филиалом
                                </a>
                            </li>
                        ) : null}
                        <li className="pure-menu-item">
                            <a href="/" className="pure-menu-link">
                                Выход
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        ) : (
            <ul className="pure-menu-list login-ul">
                <li className="pure-menu-item header-btn">
                    <a href="/login" className="pure-menu-link header-btn">
                        Войти
                    </a>
                </li>
                <li className="pure-menu-item header-btn">
                    <a href="/signup" className="pure-menu-link header-btn">
                        Зарегистрироваться
                    </a>
                </li>
            </ul>
        );
        return (
            <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed header-appbar">
                <a className="pure-menu-heading header-heading" href="/">
                    Atlas Copco
                </a>
                {mainComponent}
                {rightComponents}
            </div>
        );
    }
}

// <div className="header-appbar">
//   {isLogged ? <div className="user-page">Hello, {userName}</div> : <button className="header-login-btn">Login</button>}
// </div>

const mapStateToProps = state => ({
    isLogged: state.auth.authenticated,
    userName: state.profile.profileData.name,
    isAdmin: state.profile.profileData.isAdmin,
});

export default connect(mapStateToProps)(HeaderAppbar);

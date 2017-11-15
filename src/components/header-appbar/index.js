import React, { Component } from "react";
import "./header-appbar.scss";
import {connect} from 'react-redux'

class HeaderAppbar extends Component {
  render() {
    const { isLogged, userName, isAdmin } = this.props;
    const mainComponent = isLogged ? (
      <ul class='pure-menu-list'>
        <li class="pure-menu-item header-btn"><a href="/" class="pure-menu-link header-btn">Заявки</a></li>
        <li class="pure-menu-item header-btn"><a href="/" class="pure-menu-link header-btn">Инструменты</a></li>
      </ul>
    ) : null
    const rightComponents = isLogged ? (
      <ul class="pure-menu-list login-ul">
          <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover header-btn">
            <a href="/" class="pure-menu-link header-btn">{userName}</a>
            <ul class="pure-menu-children">
               <li class="pure-menu-item"><a href="/" class="pure-menu-link">Управление аккаунтом</a></li>
               {isAdmin ? <li class="pure-menu-item"><a href="/" class="pure-menu-link">Управление филиалом</a></li> : null}
               <li class="pure-menu-item"><a href="/" class="pure-menu-link">Выход</a></li>
           </ul>
          </li>
      </ul>
    ) : (
      <ul class="pure-menu-list login-ul">
          <li class="pure-menu-item header-btn"><a href="/login" class="pure-menu-link header-btn">Войти</a></li>
          <li class="pure-menu-item header-btn"><a href="/signup" class="pure-menu-link header-btn">Зарегистрироваться</a></li>
      </ul>)
    return (
    <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed header-appbar">
        <a class="pure-menu-heading header-heading" href="/">Atlas Copco</a>
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
  isAdmin: state.profile.profileData.isAdmin
})

export default connect(mapStateToProps)(HeaderAppbar);

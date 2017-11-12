import React, { Component } from "react";
import "./Login.scss";

class Login extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <div className="login-wrapper">
          <input placeholder="Логин" type="text" className="login-input" />
          <input placeholder="Пароль" type="password" className="login-input" />
          <button className="login-btn">Войти</button>
        </div>
      </div>
    );
  }
}

export default Login;

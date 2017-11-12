import React, { Component } from "react";
import "./Login.scss";

class Login extends Component {
  render() {
    return (
      <div className="login-wrapper">
        <input type="text" className="login-input" />
        <input type="password" className="login-input" />
        <button className="login-btn">Войти</button>
      </div>
    );
  }
}

export default Login;

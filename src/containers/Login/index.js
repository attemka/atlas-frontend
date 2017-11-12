import React, { Component } from "react";
import "./Login.scss";

class Login extends Component {
  login() {
    //login here
  }

  render() {
    return (
      <div className="login-wrap">
        <input type="text" className="login-input" />
        <input type="password" className="login-input" />
        <button className="login-btn" onClick={this.login}>
          Войти
        </button>
      </div>
    );
  }
}

export default Login;

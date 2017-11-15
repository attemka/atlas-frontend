import React, { Component } from "react";
import { connect } from "react-redux";
import {browserHistory} from 'react-router'
import { signup } from "../../actions/LoginActions";
import "./SignUp.scss";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      passwordRepeat: null,
      loginFailed: false,
      emailValid: true,
      passwordValid: true
    };
  }

  handleChange = e => {
    const types = {
      Имя: "name",
      "E-mail": "email",
      Пароль: "password",
      "Подтверждение пароля": "passwordRepeat"
    };
    let field = types[e.target.placeholder];
    let obj = {};
    obj[field] = e.target.value;
    this.setState(obj);
  };

  handlePress = () => {
    const { emailValid, passwordValid, name, email, password, passwordRepeat } = this.state;
    if (emailValid && passwordValid) {
      this.props
        .signup(name, email, password, passwordRepeat)
        .then(response => {
          this.setState({
            name: null,
            email: null,
            password: null,
            passwordRepeat: null,
            loginFailed: false,
            emailValid: true,
            passwordValid: true,
            error:false
          });
          browserHistory.push('/')
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: true });
        });
    }
  };

  verifyPasswords = () => {
    const { password, passwordRepeat } = this.state;
    console.log(passwordRepeat === true);
    if (password && passwordRepeat) this.setState({ passwordValid: password === passwordRepeat });
  };

  verifyEmail = () => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ emailValid: this.state.email.match(regex) });
  };

  render() {
    let { name, email, password, passwordRepeat, emailValid, passwordValid } = this.state;
    return (
      <div className="signup-page-wrapper">
        <div className="signup-wrapper">
          <form className="pure-form pure-form-stacked">
            <fieldset>
              <input placeholder="Имя" value={name} onChange={e => this.handleChange(e)} type="text" required />
              <input
                placeholder="E-mail"
                value={email}
                onChange={e => this.handleChange(e)}
                onBlur={this.verifyEmail}
                type="text"
                required
              />
              {!emailValid && (
                <span class="pure-form-message" style={{ color: "red" }}>
                  E-mail указан неверно. Проверьте правильность ввода.
                </span>
              )}
              <input
                placeholder="Пароль"
                value={password}
                onChange={e => this.handleChange(e)}
                onBlur={this.verifyPasswords}
                type="password"
                required
              />
              <input
                placeholder="Подтверждение пароля"
                value={passwordRepeat}
                onChange={e => this.handleChange(e)}
                onBlur={this.verifyPasswords}
                type="password"
                required
              />
              {!passwordValid && (
                <span class="pure-form-message" style={{ color: "red" }}>
                  Указанные пароли не совпадают.
                </span>
              )}
              {this.state.error && (
                <span class="pure-form-message" style={{ color: "red" }}>
                  Произошла ошибка. Попробуйте снова.
                </span>
              )}
              <button type="button" className="pure-button pure-button-primary" onClick={() => this.handlePress()}>
                Зарегистрироваться
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { signup })(SignUp);

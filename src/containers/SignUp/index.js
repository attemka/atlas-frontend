import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../actions/LoginActions";
import "./SignUp.scss";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Card } from "material-ui/Card";

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
      passwordValid: true,
      authPassed: this.props.isLogged
    };
  }

  handleChange = e => {
    const types = {
      name: "name",
      "E-mail": "email",
      password: "password",
      passwordRepeat: "passwordRepeat"
    };
    let field = types[e.target.name];
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
            error: false,
            authPassed: true
          });
          browserHistory.push("/");
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: true });
        });
    }
  };

  verifyPasswords = () => {
    const { password, passwordRepeat } = this.state;
    if (password && passwordRepeat) this.setState({ passwordValid: password === passwordRepeat });
  };

  verifyEmail = () => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ emailValid: this.state.email.match(regex) });
  };

  render() {
    let { name, email, password, passwordRepeat, emailValid, passwordValid } = this.state;
    const cardStyle = {
      display: "flex",
      flexDirection: "column",
      margin: "auto"
    };

    const fieldStyle = {
      display: "block",
      margin: "10px"
    };

    return (
      <div className="signup-wrapper">
        <Card style={cardStyle}>
          <TextField
            style={fieldStyle}
            name="name"
            floatingLabelText="Имя"
            value={name}
            onChange={e => this.handleChange(e)}
          />
          <TextField
            style={fieldStyle}
            name="E-mail"
            floatingLabelText="E-mail"
            value={email}
            onChange={e => this.handleChange(e)}
            onBlur={this.verifyEmail}
            errorText={emailValid ? null : "E-mail указан неверно. Проверьте правильность ввода."}
          />
          <TextField
            style={fieldStyle}
            name="password"
            floatingLabelText="Пароль"
            value={password}
            type="password"
            onBlur={this.verifyPasswords}
            onChange={e => this.handleChange(e)}
          />
          <TextField
            style={fieldStyle}
            name="passwordRepeat"
            floatingLabelText="Повторите пароль"
            value={passwordRepeat}
            type="password"
            onBlur={this.verifyPasswords}
            onChange={e => this.handleChange(e)}
            errorText={passwordValid ? null : "Указанные пароли не совпадают"}
          />
          <RaisedButton style={fieldStyle} label="Зарегистрироваться" primary={true} onClick={this.handlePress} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.authenticated
});

export default connect(mapStateToProps, { signup })(SignUp);

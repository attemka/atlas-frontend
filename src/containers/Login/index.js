import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/LoginActions";
import "./Login.scss";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Card } from "material-ui/Card";

class Login extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      loginFailed: false,
      loginPassed: this.props.isLogged
    };
  }

  handleChange = e => {
    console.log(e.target.name);
    let field = e.target.name === "E-mail" ? "email" : "password";
    let obj = {};
    obj[field] = e.target.value;
    this.setState(obj);
  };

  handlePress = () => {
    this.props
      .login(this.state.email, this.state.password)
      .then(response => {
        this.setState({
          email: "",
          password: "",
          loginFailed: false,
          loginPassed: true
        });
      })
      .catch(error => {
        this.setState({
          email: "",
          password: "",
          loginFailed: true
        });
      });
  };

  render() {
    let { email, password, loginFailed } = this.state;
    const style = {
      display: "flex",
      margin: "auto",
      alignContent: "center",
      alignSelf: "center",
      flexDirection: "column"
    };

    const fieldStyle = {
      display: "block"
    };

    const slideDown = {
      display: "block",
      marginTop: "20px"
    };

    return (
      <div className="login-wrapper">
        <Card style={style}>
          <TextField
            style={fieldStyle}
            name="E-mail"
            floatingLabelText="E-mail"
            value={email}
            onChange={e => this.handleChange(e)}
          />
          <TextField
            style={fieldStyle}
            name="password"
            floatingLabelText="Пароль"
            value={password}
            type="password"
            errorText={ loginFailed ? "Логин или пароль введены неверно" : null}
            onChange={e => this.handleChange(e)}
          />
          <RaisedButton
            style={loginFailed ? slideDown : fieldStyle}
            label="Войти"
            primary={true}
            onClick={this.handlePress}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.authenticated
});

export default connect(mapStateToProps, { login })(Login);

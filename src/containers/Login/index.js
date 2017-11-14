import React, { Component } from 'react';
import {connect} from 'react-redux'
import './Login.scss';
import {login} from '../../actions/LoginActions'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
        };
    }

    handleChange = e => {
        let field = e.target.placeholder === 'E-mail' ? 'email' : 'password';
        let obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    };

    handlePress = () => {
      console.log(this.state)
      this.props.login(this.state.email, this.state.password)
    }

    render() {
        let { email, password } = this.state;
        console.log(email, password);
        return (
            <div className="page-wrapper">
                <div className="login-wrapper">
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <input
                                placeholder="E-mail"
                                value={email}
                                onBlur={e => this.handleChange(e)}
                                type="text"
                                required
                            />
                            <input
                                placeholder="Пароль"
                                value={password}
                                onBlur={e => this.handleChange(e)}
                                type="password"
                                required
                            />
                            <button type="button" className="pure-button pure-button-primary"
                              onClick={()=>this.handlePress()}>
                                Войти
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(null, {login})(Login);

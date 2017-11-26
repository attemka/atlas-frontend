import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/LoginActions';
import './Login.scss';
import PropTypes from 'prop-types';

class Login extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            loginFailed: false,
            loginPassed: this.props.isLogged,
        };
    }

    handleChange = e => {
        let field = e.target.placeholder === 'E-mail' ? 'email' : 'password';
        let obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    };

    handlePress = () => {
        this.props
            .login(this.state.email, this.state.password)
            .then(response => {
                this.setState({
                    email: '',
                    password: '',
                    loginFailed: false,
                    loginPassed: true,
                });
            })
            .catch(error => {
                this.setState({
                    email: '',
                    password: '',
                    loginFailed: true,
                });
            });
    };

    render() {
        console.log(this.props.history);
        let { email, password, loginFailed } = this.state;
        return (
            <div className="page-wrapper">
                <div className="login-wrapper">
                    {this.state.loginPassed ? <Redirect to="/" /> : null}
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <input
                                placeholder="E-mail"
                                value={email}
                                onChange={e => this.handleChange(e)}
                                type="text"
                                required
                            />
                            <input
                                placeholder="Пароль"
                                value={password}
                                onChange={e => this.handleChange(e)}
                                type="password"
                                required
                            />
                            {loginFailed && (
                                <span
                                    class="pure-form-message"
                                    style={{ color: 'red' }}
                                >
                                    Неправильный E-mail или пароль.
                                </span>
                            )}
                            <button
                                type="button"
                                className="pure-button pure-button-primary"
                                onClick={() => this.handlePress()}
                            >
                                Войти
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogged: state.auth.authenticated,
});

export default connect(mapStateToProps, { login })(Login);

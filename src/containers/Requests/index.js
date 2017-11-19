import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/LoginActions";
import "./Login.scss";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Table from "../../components/Table";

class Requests extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      loginFailed: false,
      loginPassed: this.props.isLogged,
      modalOpen: false,
    };
  }

  handleChange = date => {
    this.setState({ date });
  };

  handleSelect = e => {
    const types = {
      send: 0,
      receive: 1,
      repair: 2
    };

    this.setState({
      type: types[e.target.name]
    });
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
    let { type, modalOpen } = this.state;
    const { recipients, user } = this.props;
    return (
      <div className="page-wrapper">
        <div className="login-wrapper">
          {this.state.loginPassed ? null : <Redirect to="/" />}
          <form className="pure-form pure-form-aligned">
            <fieldset>
              <label for="type">Тип заявки</label>
              <select id="type" selected={type} onSelect={e => this.handleSelect(e)} required>
                <select name="send">Отправление</select>
                <select name="receive">Получение</select>
                <select name="repair">На ремонт</select>
              </select>
              <Modal isOpen={modalOpen}>
                <Table showOwn={type!== 1} />
              </Modal>
              <label for="receiver">Получатель</label>
              <select id="receiver" required>
                {recipients.map(el => <option>el.name</option>)}
              </select>
              <label for="sender">Отправитель</label>
              <input id="sender" value={user.filial} disabled />
              <label for="pick-date">Дата получения</label>
              <DatePicker id="pick-date" onChange={this.handleChange} />
              <button type="button" className="pure-button pure-button-primary" onClick={() => this.handlePress()}>
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
  isLogged: state.auth.authenticated
});

export default connect(mapStateToProps, { login })(Login);

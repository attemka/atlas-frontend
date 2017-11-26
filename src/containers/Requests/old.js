import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/LoginActions";
import "./Requests.scss";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Table from "../../components/Table/Table";

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
              <div className="pure-control-group">
              <label htmlFor="type">Тип заявки</label>
              <select id="type" selected={type} onSelect={e => this.handleSelect(e)} required>
                <option name="send">Отправление</option>
                <option name="receive">Получение</option>
                <option name="repair">На ремонт</option>
              </select>
              </div>
              <Modal isOpen={modalOpen}>
                <Table showOwn={type!== 1} />
              </Modal>
              <div className="pure-control-group">
              <label htmlFor="receiver">Получатель</label>
              <select id="receiver" required>
            {/*{recipients.map(el => <option>el.name</option>)}*/}
              </select>
              </div>
              <div className="pure-control-group">
              <label htmlFor="sender">Отправитель</label>
              <input id="sender" value={""} disabled />
              </div>
              <div className="pure-control-group">
              <label htmlFor="pick-date">Дата получения</label>
              <DatePicker id="pick-date" onChange={this.handleChange} />
              </div>
              <div className="pure-controls">
              <button type="button" className="pure-button pure-button-primary" onClick={() => this.handlePress()}>
                Войти
              </button>
              </div>
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

export default connect(mapStateToProps, { login })(Requests);

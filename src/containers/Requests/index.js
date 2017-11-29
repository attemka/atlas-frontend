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
import SelectableTable from "../../components/Table/SelectableTable";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Card } from "material-ui/Card";
import Dialog from 'material-ui/Dialog';

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
        selectedData: [],
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

  modalSwitch = () => {
    const option = !this.state.modalOpen;
    this.setState({modalOpen: option});
  };

  handleDropDownChange = (event, index, value) => this.setState({dropDownValue: value});

    handleSelectChange = selection => {
      this.setState({selectedData: selection})
    };

    render() {
    let { type, modalOpen, selectedData } = this.state;
    const { recipients, user } = this.props;
    const cardStyle = {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
    };
    return (
      <div className="requests-wrapper">
        <Card style={cardStyle}>
          <DropDownMenu value={this.handleDropDownChange} onChange={this.handleDropDownChange}>
            <MenuItem value="send" primaryText="Отправление"/>
            <MenuItem value="recieve" primaryText="Получение"/>
            <MenuItem value="repair" primaryText="На ремонт"/>
          </DropDownMenu>
          <RaisedButton label="Выбрать товары" onClick={this.modalSwitch}/>
          <Modal
          isOpen={modalOpen}
          >
            <SelectableTable onSelectChange={this.handleSelectChange} showOwn={true}/>
            <RaisedButton label="Подтвердить" onClick={this.modalSwitch}/>
          </Modal>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.authenticated
});

export default connect(mapStateToProps, { login })(Requests);

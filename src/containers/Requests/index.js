import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/LoginActions";
import "./Requests.scss";
import PropTypes from "prop-types";
import Modal from "react-modal";
import SelectableTable from "../../components/Table/SelectableTable";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import { Card } from "material-ui/Card";
import Checkbox from "material-ui/Checkbox";
import Dialog from "material-ui/Dialog";

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
      customAddress: false,
      dropDownValue: 0,
      selectedData: []
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
    this.setState({ modalOpen: option });
  };

  handleDropDownChange = (event, index, value) => this.setState({ dropDownValue: value });

  handleSelectChange = selection => {
    this.setState({ selectedData: selection });
  };

  onSelectConfirm = () =>{
    this.modalSwitch();
  };

  switchCheckbox = () => {
    this.setState({customAddress: !this.state.customAddress});
  };

  render() {
    let { type, modalOpen, selectedData, customAddress, dropDownValue } = this.state;
    const { recipients, user } = this.props;
    const blockStyle={
      display: "block",
      margin: "10px",
    };
    const modalStyle={
      overlay:{
        backgroundColor: 'rgba(255, 0, 0, 0.9)',
      }
      };

    return (
      <div className="requests-wrapper">
        <Card style="card-content">
          <div className="row-item">
            Тип Заказа:
          <DropDownMenu value={dropDownValue} onChange={this.handleDropDownChange}>
            <MenuItem value={0} primaryText="Отправление" />
            <MenuItem value={1} primaryText="Получение" />
            <MenuItem value={2} primaryText="На ремонт" />
          </DropDownMenu>
            </div>
          <div className="row-item" ><RaisedButton label="Выбрать товары" onClick={this.modalSwitch} />
            {!!selectedData.length && <div className="selected-items">Выбрано {selectedData.length} инструментов</div>}
          </div>
            <Modal className="table-modal" isOpen={modalOpen} styles={modalStyle}>
                <SelectableTable className="requests-table" onSelectChange={this.handleSelectChange} selection={selectedData} showOwn={true} />
                <div className="apply-btn" >
                    <RaisedButton label="Подтвердить" onClick={this.onSelectConfirm} />
                </div>
            </Modal>
          <div className="filial-addresses">
          <TextField floatingLabelText="Отправитель" />
          <TextField floatingLabelText="Получатель" />
          </div>
          <div className="checkbox-item"><Checkbox className="checkbox" onCheck={this.switchCheckbox} checked={customAddress} />Указать другой адрес.</div>
          {customAddress && (
            <div className="custom-address">
              <TextField  floatingLabelText="Контактное имя" />
              <TextField floatingLabelText="Телефон" />
              <TextField floatingLabelText="Город" />
              <TextField floatingLabelText="Улица" />
              <TextField floatingLabelText="Дом" />
              <TextField floatingLabelText="Индекс" />
            </div>
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.authenticated
});

export default connect(mapStateToProps, { login })(Requests);

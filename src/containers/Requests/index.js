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
import { checkRequest, getAccountById } from "../../actions/RequestsActions";
import api from "../../api";

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
      senderValue: "",
      recieverValue: "",
      customAddress: false,
      dropDownValue: 0,
      selectedData: []
    };
  }

  componentWillMount() {
    this.props.loadProfile();
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

  handleDropDownChange = (event, index, value) =>{
    const {account, avaliableAccounts} = this.props;
    const {recieverValue} = this.state;

    const selectedAccount = avaliableAccounts.filter(account => account.id === recieverValue)[0];

    this.setState({
      dropDownValue: value,
      contactName: value === 0 ? account.contact_name : selectedAccount.contact_name,
      contactPhone: value === 0 ? account.contact_phone : selectedAccount.contact_phone,
      contactCity: value === 0 ? account.city : selectedAccount.city,
      contactStreet: value === 0 ? account.street: selectedAccount.street,
      contactBuilding: value === 0 ? account.house : selectedAccount.house,
      contactZip: value === 0 ? account.zip : selectedAccount.zip
    })
  };

  handleRecieverChange = (event, index, value) => this.setState({recieverValue: value});

  handleSelectChange = selection => {
    this.setState({ selectedData: selection });
  };

  onSelectConfirm = () => {
    const { dropDownValue, selectedData } = this.state;
    this.modalSwitch();
    this.props
      .checkRequest(selectedData, dropDownValue)
      .then(response => Promise.all(response.data.data.from_account.map(account => this.props.getAccountById(account))))
      .then(responses => {
        console.log("res", responses);
        let senders = "";
        responses.forEach(el => (senders += `${el.data.data.name}, `));
        senders = senders.slice(0, -2);
        this.setState({ senderValue: senders });
      });
  };

  switchCheckbox = () => {
    this.setState({ customAddress: !this.state.customAddress });
  };

  render() {
    const {
      modalOpen,
      selectedData,
      customAddress,
      dropDownValue,
      avaliableAccounts,
      recieverValue,
      contactName,
      contactPhone,
      contactCity,
      contactStreet,
      contactBuilding,
      contactZip
    } = this.state;
    const { recipients, account } = this.props;
    const blockStyle = {
      display: "block",
      margin: "10px"
    };
    const modalStyle = {
      overlay: {
        backgroundColor: "rgba(255, 0, 0, 0.9)"
      }
    };

    return (
      <div className="requests-wrapper">
        <Card style="card-content">
          <div className="row-item">
            Тип Заказа:
            <DropDownMenu value={dropDownValue} onChange={this.handleDropDownChange}>
              <MenuItem value={0} primaryText="Получение" />
              <MenuItem value={1} primaryText="Отправление" />
              <MenuItem value={2} primaryText="На ремонт" />
            </DropDownMenu>
          </div>
          <div className="column-item">
            <RaisedButton label="Выбрать товары" onClick={this.modalSwitch} />
            {!!selectedData.length && <div className="selected-items">Выбрано {selectedData.length} инструментов</div>}
          </div>
          <Modal className="table-modal" isOpen={modalOpen} styles={modalStyle}>
            <SelectableTable
              className="requests-table"
              onSelectChange={this.handleSelectChange}
              selection={selectedData}
              showOwn={dropDownValue !== 0}
            />
            <div className="apply-btn">
              <RaisedButton label="Подтвердить" onClick={this.onSelectConfirm} />
            </div>
          </Modal>
          <div className="row-item">
            <TextField
              className="input-field"
              disabled
              value={dropDownValue === 1 ? this.state.senderValue : account.name}
              floatingLabelText="Отправитель"
            />
            {dropDownValue === 1 ? (
              <TextField className="input-field" disabled value={account.name} floatingLabelText="Получатель" />
            ) : (
              <DropDownMenu value={recieverValue} onChange={this.handleRecieverChange}>
                {avaliableAccounts.map(account => <MenuItem value={account.id} primaryText={account.name} />)}
              </DropDownMenu>
            )}
          </div>
          <div className="checkbox-item">
            <Checkbox className="checkbox" onCheck={this.switchCheckbox} checked={customAddress} />Указать другой адрес.
          </div>
          {customAddress && (
            <div className="custom-address">
              <div className="row-item">
                <TextField className="input-field" defaultValue={contactName} floatingLabelText="Контактное имя" />
                <TextField className="input-field" defaultValue={contactPhone} floatingLabelText="Телефон" />
              </div>
              <div className="row-item">
                <TextField className="input-field" defaultValue={contactCity} floatingLabelText="Город" />
                <TextField className="input-field" defaultValue={contactStreet} floatingLabelText="Улица" />
              </div>
              <div className="row-item">
                <TextField className="input-field" defaultValue={contactBuilding} floatingLabelText="Дом" />
                <TextField className="input-field" defaultValue={contactZip} floatingLabelText="Индекс" />
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.authenticated,
  account: state["profile"].profileData.account
});

export default connect(mapStateToProps, { checkRequest, getAccountById, loadProfile: api.actions.profile.index })(
  Requests
);

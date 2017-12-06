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
import SelectField from "material-ui/SelectField";
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
      avaliableAccounts: [],
      recieverValue: 1,
      customAddress: false,
      dropDownValue: 0,
      selectedData: []
    };
  }

  componentWillMount() {
    const { account } = this.props;
    this.props.loadProfile();
    this.props
      .getAccountById("all")
      .then(response => this.setState({ avaliableAccounts: response.data.data, recieverAccount: account }));
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

  handleDropDownChange = (event, index, value) => {
    const { account } = this.props;
    const { recieverValue, avaliableAccounts, recieverAccount, senderAccount } = this.state;
    console.log("reciever", recieverValue);
    console.log(avaliableAccounts.filter(account => account.id === recieverValue)[0]);
    let selectedAccount = {};
    this.setState({ dropDownValue: value });
    if (value === 1) selectedAccount = avaliableAccounts.filter(account => account.id === recieverValue)[0];
    const newRecieverAccount = value === 0 ? account : selectedAccount;
    this.setState({
      recieverAccount: newRecieverAccount,
      contact_name: newRecieverAccount.address.contact_name,
      contact_phone: newRecieverAccount.address.contact_phone,
      city: newRecieverAccount.address.city,
      street: newRecieverAccount.address.street,
      house: newRecieverAccount.address.house,
      zip: newRecieverAccount.address.zip
    });
  };

  handleRecieverChange = (event, index, value) => this.setState({ recieverValue: value });

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

  handleAddressChange = (name, value) => {
    console.log(name, value);
    this.setState({ [name]: value });
  };

  render() {
    const {
      modalOpen,
      selectedData,
      customAddress,
      dropDownValue,
      avaliableAccounts,
      recieverValue,
      recieverAccount,
      contact_name,
      contact_phone,
      city,
      street,
      house,
      zip
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
              value={dropDownValue === 0 ? this.state.senderValue : account.name}
              floatingLabelText="Отправитель"
            />
            {dropDownValue === 0 ? (
              <TextField className="input-field" disabled value={account.name} floatingLabelText="Получатель" />
            ) : (
              <SelectField
                className="select-field"
                floatingLabelText="Получатель"
                value={recieverValue}
                onChange={this.handleRecieverChange}
              >
                {avaliableAccounts.map(account => <MenuItem value={account.id} primaryText={account.name} />)}
              </SelectField>
            )}
          </div>
          <div className="checkbox-item">
            <Checkbox className="checkbox" onCheck={this.switchCheckbox} checked={customAddress} />Указать другой адрес.
          </div>
          {customAddress && (
            <div className="custom-address">
              <div className="row-item">
                <TextField
                  className="input-field"
                  value={contact_name}
                  defaultValue={recieverAccount.address.contact_name}
                  name="contact_name"
                  onChange={e => this.handleAddressChange(e.target.name, e.target.value)}
                  floatingLabelText="Контактное имя"
                />
                <TextField
                  className="input-field"
                  value={contact_phone}
                  name="contact_phone"
                  defaultValue={recieverAccount.address.contact_phone}
                  onChange={e => this.handleAddressChange(e.target.name, e.target.value)}
                  floatingLabelText="Телефон"
                />
              </div>
              <div className="row-item">
                <TextField
                  className="input-field"
                  value={city}
                  defaultValue={recieverAccount.address.city}
                  name="city"
                  onChange={e => this.handleAddressChange(e.target.name, e.target.value)}
                  floatingLabelText="Город"
                />
                <TextField
                  className="input-field"
                  value={street}
                  defaultValue={recieverAccount.address.street}
                  name="street"
                  onChange={e => this.handleAddressChange(e.target.name, e.target.value)}
                  floatingLabelText="Улица"
                />
              </div>
              <div className="row-item">
                <TextField
                  className="input-field"
                  value={house}
                  defaultValue={recieverAccount.address.house}
                  name="house"
                  onChange={e => this.handleAddressChange(e.target.name, e.target.value)}
                  floatingLabelText="Дом"
                />
                <TextField
                  className="input-field"
                  value={zip}
                  defaultValue={recieverAccount.address.zip}
                  name="zip"
                  onChange={e => this.handleAddressChange(e.target.name, e.target.value)}
                  floatingLabelText="Индекс"
                />
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

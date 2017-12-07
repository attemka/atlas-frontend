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
import { checkRequest, getAccountById, getAllAccounts, sendRequest } from "../../actions/RequestsActions";
import api from "../../api";
import _ from "lodash";

const SEND_TYPE = 1;
const RECIEVE_TYPE = 0;
const ON_REPAIR = 2;

const nullAddressObject = {
  contact_name: null,
  contact_phone: null,
  city: null,
  street: null,
  house: null,
  zip: null
};

class Requests extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      receiverAccountId: 0,
      customAddress: false,
      dropDownValue: 0,
      selectedData: []
    };
  }

  componentWillMount() {
    const { account } = this.props;
    this.props.loadProfile();
    this.props.getAllAccounts();
  }

  handleChange = date => {
    this.setState({ date });
  };

  modalSwitch = () => {
    const option = !this.state.modalOpen;
    this.setState({ modalOpen: option });
  };

  handleDropDownChange = (event, index, dropDownValue) => {
    const adminAccount = this.props.accounts.find(acc => acc.is_admin) || {};
    console.log("adminid", adminAccount.id);
    console.log(dropDownValue === ON_REPAIR ? adminAccount.id : this.state.receiverAccountId);
    if (dropDownValue === this.state.dropDownValue) return;
    this.setState({
      ...this.state,
      dropDownValue,
      receiverAccountId: dropDownValue === ON_REPAIR ? adminAccount.id : this.state.receiverAccountId,
      ...nullAddressObject
    });
  };

  extractValue = field => {
    return this.state[field] || this.extractDefaultValue(field);
  };

  extractDefaultValue = field => {
    if (this.state.dropDownValue === RECIEVE_TYPE) {
      const ownAddress = this.props.currentAccount.address || {};
      return ownAddress[field] || "";
    } else {
      const receiverAccount = this.props.accounts.find(acc => acc.id === this.state.receiverAccountId) || {};
      console.log(receiverAccount, this.state.receiverAccountId);
      const address = receiverAccount.address || {};
      return address[field] || "";
    }
  };

  handleRecieverChange = (event, index, value) =>
    this.setState({
      ...this.state,
      receiverAccountId: value
    });

  handleSelectChange = selection => {
    this.setState({ selectedData: selection });
  };

  onSelectConfirm = () => {
    const { dropDownValue, selectedData } = this.state;
    this.modalSwitch();
    this.props.checkRequest(selectedData, dropDownValue);
  };

  switchCheckbox = () => {
    this.setState({
      ...this.state,
      customAddress: !this.state.customAddress,
      ...nullAddressObject
    });
  };

  handleAddressChange = (name, value) => this.setState({ [name]: value });

  buildSenderPresentation = () => {
    const result = _.reduce(
      this.props.requestInfo.fromAccount,
      (strRes, accountId) => {
        const account = this.props.accounts.find(acc => acc.id === accountId);
        return strRes + `${account.name}, `;
      },
      ""
    );
    return result.slice(0, -2);
  };

  sendRequest = () => {
    const {
      dropDownValue,
      receiverAccountId,
      selectedData,
      customAddress,
      comment,
      target,
      contact_phone,
      city,
      zip,
      contact_name,
      street,
      house
    } = this.state;
    const customAddressData = customAddress ? {
      contact_phone,
      city,
      zip,
      contact_name,
      street,
      house
    } : null;
    const data = {
      products: selectedData,
      invoice_type: dropDownValue,
      address: customAddress ? null : receiverAccountId,
      customAddressData,
      comment,
      target,
    };
  };

  buildTextFieldProps = (entity, text) => {
    const { customAddress } = this.state;
    return {
      className: "input-field",
      value: this.extractValue(entity),
      name: entity,
      disabled: !customAddress,
      onChange: e => this.handleAddressChange(e.target.name, e.target.value),
      floatinLabelText: text
    };
  };

  renderTextFields = () => {
    return (
      <div className="custom-address">
        <div className="row-item">
          <TextField {...this.buildTextFieldProps("contact_name", "Контактное имя")} />
          <TextField {...this.buildTextFieldProps("contact_phone", "Контактный телефон")} />
        </div>
        <div className="row-item">
          <TextField {...this.buildTextFieldProps("city", "Город")} />
          <TextField {...this.buildTextFieldProps("street", "Улица")} />
        </div>
        <div className="row-item">
          <TextField {...this.buildTextFieldProps("house", "Дом")} />
          <TextField {...this.buildTextFieldProps("zip", "Индекс")} />
        </div>
      </div>
    );
  };

  renderTable = () => {
    const { dropDownValue, selectedData } = this.state;
    return (
      <div>
        <SelectableTable
          className="requests-table"
          onSelectChange={this.handleSelectChange}
          selection={selectedData}
          showOwn={dropDownValue !== RECIEVE_TYPE}
        />
        <div className="apply-btn">
          <RaisedButton label="Подтвердить" onClick={this.onSelectConfirm} />
        </div>
      </div>
    );
  };

  renderRecieverField = () => {
    switch (this.state.dropDownValue) {
      case RECIEVE_TYPE:
        return (
          <TextField
            className="input-field"
            disabled
            value={this.props.currentAccount.name}
            floatingLabelText="Получатель"
          />
        );
      case SEND_TYPE:
        return (
          <SelectField
            className="select-field"
            floatingLabelText="Получатель"
            value={this.state.receiverAccountId}
            onChange={this.handleRecieverChange}
          >
            {this.props.accounts.map(account => (
              <MenuItem key={account.id} value={account.id} primaryText={account.name} />
            ))}
          </SelectField>
        );
      case ON_REPAIR:
        const adminAccount = this.props.accounts.find(acc => acc.is_admin) || {};
        return (
          <TextField
            className="input-field"
            disabled
            value={adminAccount.name || "Москва"}
            floatingLabelText="Получатель"
          />
        );
    }
  };

  render() {
    const { modalOpen, selectedData, customAddress, dropDownValue, receiverAccountId } = this.state;
    const { currentAccount } = this.props;
    const blockStyle = {
      display: "block",
      margin: "10px"
    };
    const modalStyle = {
      overlay: {
        backgroundColor: "rgba(255, 0, 0, 0.9)"
      }
    };

    if (modalOpen) return this.renderTable();
    return (
      <div className="requests-wrapper">
        <Card style="card-content">
          <div className="row-item">
            Тип Заказа:
            <DropDownMenu value={dropDownValue} onChange={this.handleDropDownChange}>
              <MenuItem value={0} primaryText="Получение" />
              <MenuItem value={1} primaryText="Отправление" />
              {!currentAccount.is_admin ? <MenuItem value={2} primaryText="На ремонт" /> : null}
            </DropDownMenu>
          </div>
          <div className="column-item">
            <RaisedButton label="Выбрать товары" onClick={this.modalSwitch} />
            {!!selectedData.length && <div className="selected-items">Выбрано {selectedData.length} инструментов</div>}
          </div>
          <div className="row-item">
            <TextField
              className="input-field"
              disabled
              value={dropDownValue === RECIEVE_TYPE ? this.buildSenderPresentation() : currentAccount.name}
              floatingLabelText="Отправитель"
            />
            {this.renderRecieverField()}
          </div>
          <div className="checkbox-item">
            <Checkbox className="checkbox" onCheck={this.switchCheckbox} checked={customAddress} />Указать другой адрес.
          </div>
          {this.renderTextFields()}
          <RaisedButton label="Подтвердить" onClick={this.sendRequest} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.authenticated,
  currentAccount: state.profile.profileData.account,
  accounts: state.accounts.accountList,
  requestInfo: state.requests.currentRequestMetaInfo
});

const mapDispatchToProps = {
  checkRequest,
  getAccountById,
  getAllAccounts,
  loadProfile: api.actions.profile.index
};

export default connect(mapStateToProps, mapDispatchToProps)(Requests);

import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/LoginActions";
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
import "./NewRequest.scss";
import Chip from "material-ui/Chip";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";

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

const buttonStyle = {
  margin: 12
};

class NewRequest extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.props.loadProfile();
    this.props.getAllAccounts();
    this.state = {
      modalOpen: false,
      customAddress: false,
      dropDownValue: 0,
      receiverAccountId: this.props.currentAccount.id,
      selectedData: [],
      target: 0,
      typeFilter: ""
    };
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
    if (dropDownValue === this.state.dropDownValue) return;
    this.setState({
      ...this.state,
      dropDownValue,
      selectedData: [],
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
      const address = receiverAccount.address || {};
      return address[field] || "";
    }
  };
  handleTargetChange = (event, index, value) => {
    this.setState({ target: value });
  };

  handleCommentChange = (name, value) => {
    this.setState({ comment: value });
  };

  handleRecieverChange = (event, index, value) =>
    this.setState({
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
    const objectAddress = !this.state.customAddress
      ? _.mapValues(nullAddressObject, (value, key) => this.extractValue(key))
      : nullAddressObject;
    this.setState({ ...this.state, customAddress: !this.state.customAddress, ...objectAddress });
  };

  handleAddressChange = (name, value) => this.setState({ [name]: value });

  buildSenderPresentation = () => {
    const result = _.reduce(
      this.props.requestInfo.fromAccount,
      (strRes, accountId) => {
        const account = this.props.accounts.find(acc => acc.id === accountId) || this.props.currentAccount;
        return strRes + `${account.name}, `;
      },
      ""
    );
    return result.slice(0, -2);
  };

  checkButtonAvaliability = () => {
    const {
      receiverAccountId,
      customAddress,
      selectedData,
      contact_phone,
      city,
      zip,
      contact_name,
      street,
      house
    } = this.state;
    const addressFields = ["contact_phone", "city", "zip", "contact_name", "street", "house"];
    if (selectedData.length === 0) return true;
    return !(receiverAccountId
      ? customAddress
        ? _(this.state)
            .pick(addressFields)
            .pickBy()
            .toPairs()
            .value().length === addressFields.length
        : true
      : customAddress &&
        _(this.state)
          .pick(addressFields)
          .pickBy()
          .toPairs()
          .value().length === addressFields.length);
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
    const customAddressData = customAddress
      ? {
          contact_phone,
          city,
          zip,
          contact_name,
          street,
          house
        }
      : null;
    const data = {
      products: selectedData,
      invoice_type: dropDownValue,
      comment,
      target
    };

    if (customAddress) data["custom_address"] = customAddressData;
    else data["address"] = receiverAccountId;
    this.setState({ selectedData: [] });
    this.props.sendRequest(data).then(() => this.props.history.push("/requests"));
  };

  buildTextFieldProps = (entity, text) => {
    const { customAddress } = this.state;
    return {
      className: "input-field",
      value: this.extractValue(entity),
      name: entity,
      disabled: !customAddress,
      onChange: e => this.handleAddressChange(e.target.name, e.target.value),
      floatingLabelText: text
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

  filterPicked = typeFilter => {
    this.setState({
      ...this.state,
      typeFilter
    });
  };

  renderOneFilter = (filterType, i) => {
    return this.state.typeFilter === filterType ? (
      <RaisedButton key={i} label={filterType} primary style={buttonStyle} />
    ) : (
      <RaisedButton key={i} label={filterType} style={buttonStyle} onClick={this.filterPicked.bind(this, filterType)} />
    );
  };

  renderFilterTypes = () => {
    if (!this.props.filterTypes.length) return null;
    return (
      <div>
        {this.props.filterTypes.map(this.renderOneFilter)}
        {this.state.typeFilter != "" ? (
          <Chip
            onRequestDelete={this.filterPicked.bind(this, "")}
            onClick={this.filterPicked.bind(this, "")}
            style={buttonStyle}
          >
            Сбросить фильтр
          </Chip>
        ) : null}
      </div>
    );
  };

  renderTable = () => {
    const { dropDownValue, selectedData } = this.state;
    return (
      <div>
        {this.renderFilterTypes()}
        <Card style={{ margin: 12 }}>
          <SelectableTable
            className="requests-table"
            onSelectChange={this.handleSelectChange}
            selection={selectedData}
            forInvoices={true}
            typeFilter={this.state.typeFilter}
            showOwn={dropDownValue !== RECIEVE_TYPE}
          />
          <FloatingActionButton style={{ right: 40, position: "fixed", bottom: 60 }} onClick={this.onSelectConfirm}>
            <ContentAdd />
          </FloatingActionButton>
        </Card>
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
    const { modalOpen, selectedData, customAddress, dropDownValue, receiverAccountId, comment, target } = this.state;
    const { currentAccount } = this.props;
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
          <div className="row-item">
            <SelectField
              className="select-field"
              floatingLabelText="Цель заявки"
              value={target}
              onChange={this.handleTargetChange}
            >
              <MenuItem value={0} primaryText="Выставка" />
              <MenuItem value={1} primaryText="Демонстрация" />
              <MenuItem value={2} primaryText="Семинар" />
              <MenuItem value={3} primaryText="Возврат" />
            </SelectField>
            <TextField
              className="input-field"
              value={comment}
              floatingLabelText="Комментарий"
              onChange={this.handleCommentChange}
            />
          </div>
          <div className="row-item">
            <RaisedButton label="Подтвердить" disabled={this.checkButtonAvaliability()} onClick={this.sendRequest} />
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.authenticated,
  currentAccount: state.profile.profileData.account,
  accounts: state.accounts.accountList,
  requestInfo: state.requests.currentRequestMetaInfo,
  filterTypes: state.filters.filterTypes
});

const mapDispatchToProps = {
  checkRequest,
  getAccountById,
  getAllAccounts,
  sendRequest,
  loadProfile: api.actions.profile.index
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);

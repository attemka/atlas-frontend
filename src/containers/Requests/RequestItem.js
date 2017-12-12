import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequests } from "../../actions/RequestsActions";
import { updateInvoiceStatus } from "../../actions/RequestsActions";
import { Card, CardHeader, CardText } from "material-ui/Card";
import api from "../../api";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import moment from "moment";
import "./RequestItem.scss";
import _ from "lodash";

const STATUS_NAMES = {
  0: "Создано",
  1: "Отдано курьеру",
  2: "Принято от курьера",
  3: "Аннулировано"
};

class RequestItem extends Component {
  constructor(props) {
    super(props);
    this.props.getRequests();
    this.state = {
      trackingNum: ""
    };
  }
  handleTrackingNumChange = (event, value) => {
    this.setState({ trackingNum: value });
  };

  updateInvioceStatus = () => {
    this.props
      .updateInvoiceStatus(this.props.invoice.id, { status: this.props.invoice.status + 1 })
      .then(res => this.props.getRequests());
  };

  sendTrackingNumber = () => {
    const { trackingNum } = this.state;
    if (this.state.trackingNum) {
      this.props.updateInvoiceStatus(this.props.invoice.id, { status: 1, track_id: trackingNum }).then(result => {
        this.setState({ trackingNum: "" });
        this.props.getRequests();
      });
    }
  };
  renderAccountBlock = (account, text) => {
    return (
      <div className="content-block">
        <h3>{text}</h3>
        <div className="params-list">
          <div className="param">
            <span className="param-title">Имя контакного лица:</span>
            {account.address.contact_name}
          </div>
          <div className="param">
            <span className="param-title">Контактный номер:</span>
            {account.address.contact_phone}
          </div>
          <div className="param">
            <span className="param-title">Город:</span>
            {account.address.city}
          </div>
          <div className="param">
            <span className="param-title">Улица:</span>
            {account.address.street}
          </div>
          <div className="param">
            <span className="param-title">Дом:</span>
            {account.address.house}
          </div>
          <div className="param">
            <span className="param-title">Индекс:</span>
            {account.address.zip}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { invoice, testItem } = this.props;
    const { trackingNum } = this.state;
    console.log(invoice.invoice_changes);
    return (
      <div className="requests-item-wrapper">
        {invoice["id"] && (
          <Card className="invoice-item-card">
            <CardHeader
              titleStyle={{ fontWeight: "800", fontSize: "20px" }}
              title={`Заявка №${invoice.id}`}
              subTitle={`${invoice.from_account.name} - ${invoice.to_account.name}`}
            />
            <CardText>
              <div className="card-content">
                {this.renderAccountBlock(invoice.from_account, "От кого:")}
                {this.renderAccountBlock(invoice.to_account, "Кому:")}
                <div className="content-block">
                  <h3>История заявки:</h3>
                  {invoice.invoice_changes.map(change => (
                    <div className="history-events">
                      {change.status === 0 ? (
                        <div className="status-line">
                          {moment(invoice.invoice_changes[0].time).format("DD-MM-YYYY hh:mm:ss")}: Заявка создана.
                        </div>
                      ) : (
                        <div className="status-line">
                          {moment(change.time).format("DD-MM-YYYY hh:mm:ss")}: Статус изменен на{" "}
                          {`"${STATUS_NAMES[change.status]}"`}
                          {"\n"}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="content-block">
                  <h3>Выбранные инструменты:</h3>
                  {invoice.invoice_lines.map(item => (
                    <div className="invoice-item">
                      {item.id} {item.title} {item.number_for_order}
                    </div>
                  ))}
                </div>
                {invoice.status !== 3 && (
                  <div className="content-block">
                    <h3>Управление статусом:</h3>
                    Изменить статус на {`"${STATUS_NAMES[invoice.status + 1]}"`}
                    {invoice.status === 0 && (
                      <div className="input-block">
                        <TextField
                          floatingLabelText="Трэкинг-номер"
                          value={trackingNum}
                          onChange={this.handleTrackingNumChange}
                        />
                        <RaisedButton onClick={this.sendTrackingNumber} label="Изменить" />
                      </div>
                    )}
                    {invoice.status !== 0 &&
                      invoice.status !== 3 && (
                        <RaisedButton onClick={() => this.updateInvioceStatus()} label="Изменить" />
                      )}
                  </div>
                )}
              </div>
            </CardText>
          </Card>
        )}
      </div>
    );
  }
}

RequestItem.defaultProps = {
  invoice: {}
};
const mapStateToProps = (state, props) => ({
  isLogged: state.auth.authenticated,
  currentAccount: state.profile.profileData.account,
  invoice: state.products.invoicesList.results.find(invoice => invoice.id === parseInt(props.match.params["id"], 10)),
  testItem: props
});

const mapDispatchToProps = {
  getRequests,
  updateInvoiceStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestItem);

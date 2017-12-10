import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequests } from "../../actions/RequestsActions";
import { Card } from "material-ui/Card";
import api from "../../api";
import "./RequestsList.scss";

class RequestsList extends Component {
  constructor(props) {
    super(props);
    this.props.getRequests();
    this.state = { invoices: [] };
  }

  render() {
    const { invoicesList } = this.props;
    console.log(invoicesList.length);
    return (
      <div className="requests-list-wrapper">
        {invoicesList.length !== 0 && invoicesList.map(invoice => <Card className="invoice-card"><div>{invoice.id}</div></Card>)}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLogged: state.auth.authenticated,
  currentAccount: state.profile.profileData.account,
  invoicesList: state.products.invoicesList.results
});

const mapDispatchToProps = {
  getRequests
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestsList);

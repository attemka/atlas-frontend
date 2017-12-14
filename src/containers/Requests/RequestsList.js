import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequests } from "../../actions/RequestsActions";
import { Card, CardHeader, CardText } from "material-ui/Card";
import api from "../../api";
import ReactPaginate from "react-paginate";
import "./RequestsList.scss";

const STATUS_NAMES = {
  0: "Создано",
  1: "Отдано курьеру",
  2: "Принято от курьера",
  3: "Аннулировано"
};

class RequestsList extends Component {
  constructor(props) {
    super(props);
    this.props.getRequests([0, 1], 1);
    this.state = {
      page: 1
    };
  }

  render() {
    const { invoicesList } = this.props;
    console.log("invoices", invoicesList);
    return (
      <div className="requests-list-wrapper">
        {invoicesList.length !== 0 &&
          invoicesList.map(invoice => (
            <Card
              key={invoice.id}
              className="invoice-card"
              onClick={() => this.props.history.push(`/requests/${invoice.id}`)}
            >
              <CardHeader titleStyle={{ fontWeight: "800", fontSize: "20px" }} title={`Заявка №${invoice.id}`} />
              <CardText>
                <div className="invoice-info">
                  <span className="category-name">Из: </span>
                  {" " + invoice.from_account.name}{" "}
                </div>
                <div className="invoice-info">
                  <span className="category-name">В: </span>
                  {" " + invoice.to_account.name}
                </div>
                <div className="invoice-info">
                  <span className="category-name">Статус: </span>
                  {" " + STATUS_NAMES[invoice.status]}
                </div>
              </CardText>
            </Card>
          ))}
          <ReactPaginate previousLabel="пред."
                         nextLabel="след."
                         breakLabel={<a href="">...</a>}
                         breakClassName={"break-me"}
                         pageCount={this.props.totalPages}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.handlePageClick}
                         containerClassName={"pagination"}
                         subContainerClassName={"pages pagination"}
                         activeClassName={"active"} />
      </div>
    );
  }
}

RequestsList.defaultProps = {
  invoicesList: []
};
const mapStateToProps = state => ({
  isLogged: state.auth.authenticated,
  currentAccount: state.profile.profileData.account,
  invoicesList: state.requests.requestsList,
  totalPages: state.requests.totalPages
});

const mapDispatchToProps = {
  getRequests
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestsList);

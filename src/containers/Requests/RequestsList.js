import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequests } from "../../actions/RequestsActions";
import { Card, CardHeader, CardText } from "material-ui/Card";
import api from "../../api";
import SelectField from "material-ui/SelectField";
import ReactPaginate from "react-paginate";
import MenuItem from "material-ui/MenuItem";

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
    this.state={filterValue: ['0', '1']}
  }

  handlePageChange = page => {
    this.props.getRequests(this.state.filterValue, page.selected + 1);
  };

  handleFilterChange = (event, target, filter) =>{
    console.log(filter);
    this.props.getRequests(filter.map(el => parseInt(el, 10)), 1);
    this.setState({filterValue: filter});
  };

  render() {
    const { invoicesList } = this.props;
    const {filterValue} = this.state;

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
        <div className="bottom-control">
          <SelectField multiple={true} value={filterValue} onChange={this.handleFilterChange} floatingLabelText="Фильтр" >
            {Object.keys(STATUS_NAMES).map(status =>(
              <MenuItem key={status} value={status} primaryText={STATUS_NAMES[status]} />
            ))}
          </SelectField>
        <ReactPaginate
          previousLabel="пред."
          nextLabel="след."
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={this.props.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
        </div>
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

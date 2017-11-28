import React, { Component } from "react";
import "./Table.scss";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getProducts } from "../../actions/ProductsActions";
import moment from 'moment';
const CheckboxTable = checkboxHOC(ReactTable);
class Table extends Component {
  componentWillMount = () => {
    const { getProducts, showOwn } = this.props;
    getProducts({ page: 1, page_size: 20, show_own: showOwn });
  };

  render() {
    return (
      <div className="table">
        <CheckboxTable
          data={this.props.products}
          manual
          showPageSizeOptions={false}
          columns={[
            {
              Header: "Название",
              accessor: "title"
            },
            {
              Header: "Номер",
              accessor: "number"
            },
            {
              Header: "Номер для заказа",
              accessor: "number_for_order"
            },
            {
              Header: "Год выпуска",
              accessor: "year"
            },
            {
              Header: "Ответственный",
              accessor: "responsible_text"
            },
            {
              Header: "Когда",
              id: "UpdateDate",
              accessor: data => moment(data.location_update).format("DD-MM-YYYY")
            },
            {
              Header: "Комментарий",
              accessor: "comment"
            }
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.productsList
});

export default connect(mapStateToProps, { getProducts })(Table);

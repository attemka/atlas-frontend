import React, { Component } from "react";
import "./Table.scss";
import "react-table/react-table.css";
import ReactTable from "react-table";
import {connect} from 'react-redux';
import {getProducts} from "../../actions/ProductsActions"

class Table extends Component {

  componentWillMount = ()=> {
    this.props.getProducts()
  }

  render() {
    console.log(this.props.productsx);
    return (
      <div className="table">
          <ReactTable
            data={this.props.products}
            manual
            showPageSizeOptions={false}
            columns={[
              {
                Header: "ID",
                accessor: "id"
              },
              {
                Header: "Название",
                accessor: "title"
              },
              {
                Header: "Год",
                accessor: "year"
              },
              {
                Header: "Ответственный",
                accessor: "responsible_text"
              },
              {
                Header: "Когда",
                accessor: "location_update"
              },
              {
                Header: "Комментарий",
                accessor: "comment"
              }
            ]}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.productsList
})

export default connect(mapStateToProps, {getProducts})(Table);

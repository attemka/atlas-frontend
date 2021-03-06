import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/ProductsActions";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardText, CardHeader } from "material-ui/Card";
import moment from "moment";
import ReactPaginate from "react-paginate";

import "./ToolManage.scss";

class ToolManage extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };
  }

  componentWillMount() {
    this.props.getProducts({ page: this.state.currentPage, page_size: 10});
  }

  handlePageChange = page => {
    this.props.getProducts({ page: page.selected + 1, page_size: 10});
  };

  handleRowSelection = (selectedRow) => {
    console.log(selectedRow);
    this.setState({
      selected: selectedRow,
    });
  };

  render() {
    const { profile, products } = this.props;
    if (!profile.is_admin) this.props.history.push("/");
    return (
      <div className="tool-manage-wrapper">
        <div className="control-buttons">
          <RaisedButton label="Добавить" onClick={this.addTool}/>
          <RaisedButton label="Редактировать" onClick={this.editTool}/>
          <RaisedButton label="Удалить" onClick={this.deleteTool}/>
        </div>
        <Table onRowSelection={this.handleRowSelection}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Название</TableHeaderColumn>
              <TableHeaderColumn>Наименование</TableHeaderColumn>
              <TableHeaderColumn>Номер</TableHeaderColumn>
              <TableHeaderColumn>Номер для заказа</TableHeaderColumn>
              <TableHeaderColumn>Год выпуска</TableHeaderColumn>
              <TableHeaderColumn>Ответственный</TableHeaderColumn>
              <TableHeaderColumn>Когда</TableHeaderColumn>
              <TableHeaderColumn>Комментарий</TableHeaderColumn>
              <TableHeaderColumn>На ремонте</TableHeaderColumn>
              <TableHeaderColumn>В пути</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products &&
              products.map((product, index) => (
                <TableRow selected={this.state.selected === index}>
                  <TableRowColumn>{product.title}</TableRowColumn>
                  <TableRowColumn>{product.name}</TableRowColumn>
                  <TableRowColumn>{product.number}</TableRowColumn>
                  <TableRowColumn>{product.number_for_order}</TableRowColumn>
                  <TableRowColumn>{product.year}</TableRowColumn>
                  <TableRowColumn>{product.responsible_text}</TableRowColumn>
                  <TableRowColumn>
                    {product.location_update ? moment(product.location_update).format("DD-MM-YYYY") : ""}
                  </TableRowColumn>
                  <TableRowColumn>{product.comment}</TableRowColumn>
                  <TableRowColumn>{product.on_repair ? "да" : "нет"}</TableRowColumn>
                  <TableRowColumn>{product.on_transition ? "да" : "нет"}</TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <ReactPaginate
          previousLabel="пред."
          nextLabel="след."
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={this.props.totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          onPageChange={this.handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profileData,
  products: state.products.productsList,
  totalPages: state.products.totalPages
});

const mapDispatchToProps = {
  getProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolManage);

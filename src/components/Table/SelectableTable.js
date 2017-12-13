import React, { Component } from "react";
import "./Table.scss";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getProducts, getProductsForInvoices } from "../../actions/ProductsActions";
import moment from "moment";
import checkboxHOC from "./checkboxHOC";

const CheckboxTable = checkboxHOC(ReactTable);
export const columns = [
    {
        Header: 'Название',
        accessor: 'title',
    },
    {
      Header:'Наименование',
      accessor: 'name'
    },
    {
        Header: 'Номер',
        accessor: 'number',
    },
    {
        Header: 'Номер для заказа',
        accessor: 'number_for_order',
    },
    {
        Header: 'Год выпуска',
        accessor: 'year',
    },
    {
        Header: 'Ответственный',
        accessor: 'responsible_text',
    },
    {
        Header: 'Когда',
        id: 'UpdateDate',
        accessor: data => {
          if (data.location_update) return moment(data.location_update).format('DD-MM-YYYY')
          else return ''
        },
    },
    {
        Header: 'Комментарий',
        accessor: 'comment',
    },
];
const tableStyle = {
  backgroundColor: "rgba(255,255,255,1)"
};
class SelectableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: props.selection || [],
      selectAll: false,
      currPage: 1
    };
  }
  componentWillMount() {
    const { getProducts, getProductsForInvoices, showOwn, forInvoices, typeFilter } = this.props;
    forInvoices
      ? getProducts({
          page: this.state.currPage,
          page_size: 20,
          show_own: showOwn,
          type_filter:typeFilter,
        })
      : getProductsForInvoices({
          page: this.state.currPage,
          page_size: 20,
          show_own: showOwn,
          type_filter:typeFilter
        })
  }

  toggleSelection = (key, shift, row) => {
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    if (keyIndex >= 0) {
      selection = [...selection.slice(0, keyIndex), ...selection.slice(keyIndex + 1)];
    } else {
      selection.push(key);
    }
    this.props.onSelectChange(selection);
    this.setState({ selection });
  };

  isSelected = key => {
    return this.state.selection.includes(key);
  };

  toggleAll = () => {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      currentRecords.forEach(item => {
        selection.push(item._original.id);
      });
    }
    this.props.onSelectChange(selection);
    this.setState({ selectAll, selection });
  };

  onPageChanged = (page) => {
    this.setState({
      ...this.state,
      currPage: page+1
    })
    const { getProducts, getProductsForInvoices, showOwn,forInvoices, typeFilter  } = this.props;
    if (forInvoices) getProductsForInvoices({page:page+1, page_size: 20, show_own: showOwn, type_filter:typeFilter})
    else getProducts({page:page+1, page_size: 20, show_own: showOwn, type_filter:typeFilter})
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.typeFilter != this.props.typeFilter) {
      this.setState({
        ...this.state,
        currPage: 1
      })
      const { getProducts, getProductsForInvoices, showOwn,forInvoices, typeFilter  } = nextProps;
      if (forInvoices) getProductsForInvoices({page:1, page_size: 20, show_own: showOwn, type_filter:typeFilter})
      else getProducts({page:1, page_size: 20, show_own: showOwn, type_filter:typeFilter})
    }
  }

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const {selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll
    };
    return (
      <CheckboxTable
        style={tableStyle}
        ref={r => (this.checkboxTable = r)}
        data={this.props.products}
        page={this.state.currPage-1}
        loading={this.props.fetching}
        pages={this.props.totalPages}
        onPageChange={this.onPageChanged}
        manual
        showPageSizeOptions={false}
        columns={columns}
        {...checkboxProps}
      />
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.productsList,
  totalPages: state.products.totalPages,
  fetching: state.products.fetching
});

export default connect(mapStateToProps, { getProducts, getProductsForInvoices })(SelectableTable);

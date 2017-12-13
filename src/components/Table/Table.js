import React, { Component } from 'react';
import './Table.scss';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/ProductsActions';
import moment from 'moment';
import { columns } from './SelectableTable'


class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage:1
        };
    }

    componentWillMount() {
        const { getProducts, showOwn, typeFilter } = this.props;
        getProducts({page: this.state.page, page_size: 20, show_own: showOwn, type_filter: typeFilter})
    }

    onPageChanged = (page) => {
      this.setState({
        currPage: page+1
      })
      const { getProducts, showOwn, typeFilter } = this.props;
      getProducts({page:page+1, page_size: 20, show_own: showOwn, type_filter: typeFilter})
    }

    componentWillReceiveProps = (nextProps) => {

      if(nextProps.typeFilter != this.props.typeFilter) {
        const { getProducts, showOwn, typeFilter } = nextProps
        this.setState({
          currPage: 1
        })
        getProducts({page:1, page_size: 20, show_own: showOwn, type_filter: typeFilter})
      }
    }

    render() {
        return (
                <ReactTable
                    data={this.props.products}
                    manual
                    page={this.state.currPage-1}
                    onPageChange={this.onPageChanged}
                    pages={this.props.totalPages}
                    loading={this.props.fetching}
                    showPageSizeOptions={false}
                    columns={columns}
                />
        );
    }
}

Table.defaultProps = {
  typeFilter: ''
}

const mapStateToProps = state => ({
    products: state.products.productsList,
    totalPages: state.products.totalPages,
    fetching: state.products.fetching
});

export default connect(mapStateToProps, { getProducts })(Table);

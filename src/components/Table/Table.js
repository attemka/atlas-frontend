import React, { Component } from 'react';
import './Table.scss';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/ProductsActions';
import moment from 'moment';
import { columns } from './SelectableTable'



class Table extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            columns: [],
        };
    }
    componentWillMount() {
        const { getProducts, showOwn } = this.props;
        getProducts({
            page: 1,
            page_size: 20,
            show_own: showOwn,
        }).then(result => {
            this.setState({ data: result.data.data.results });
        });
    }
    testfunc = () => console.log('works');

    render() {
        const { data } = this.state;
        return (
                <ReactTable
                    data={data}
                    manual
                    showPageSizeOptions={false}
                    columns={columns}
                />
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.productsList,
});

export default connect(mapStateToProps, { getProducts })(Table);

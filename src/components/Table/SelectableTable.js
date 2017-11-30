import React, { Component } from 'react';
import './Table.scss';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/ProductsActions';
import moment from 'moment';
import checkboxHOC from './checkboxHOC';

const CheckboxTable = checkboxHOC(ReactTable);
export const columns = [
    {
        Header: 'Название',
        accessor: 'title',
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
        accessor: data => moment(data.location_update).format('DD-MM-YYYY'),
    },
    {
        Header: 'Комментарий',
        accessor: 'comment',
    },
];
const tableStyle ={
    backgroundColor:'rgba(255,255,255,1)',
};
    class SelectableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [],
            selection: props.selection || [],
            selectAll: false,
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

    toggleSelection = (key, shift, row) => {
        let selection = [...this.state.selection];
        const keyIndex = selection.indexOf(key);
        if (keyIndex >= 0) {
            selection = [
                ...selection.slice(0, keyIndex),
                ...selection.slice(keyIndex + 1),
            ];
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
            const currentRecords = wrappedInstance.getResolvedState()
                .sortedData;
            currentRecords.forEach(item => {
                selection.push(item._original.id);
            });
        }
        this.props.onSelectChange(selection);
        this.setState({ selectAll, selection });
    };

    render() {
        const { toggleSelection, toggleAll, isSelected } = this;
        const { data, selectAll } = this.state;

        const checkboxProps = {
            selectAll,
            isSelected,
            toggleSelection,
            toggleAll,
        };
        return (
                <CheckboxTable
                    style={tableStyle}
                    ref={r => (this.checkboxTable = r)}
                    data={data}
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
});

export default connect(mapStateToProps, { getProducts })(SelectableTable);

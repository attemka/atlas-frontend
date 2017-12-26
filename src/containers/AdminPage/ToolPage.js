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

const TOOL_FIELDS={
    number: "Номер",
    number_for_order:'Номер для заказа',
    name:'Имя',
    title:'Название',
    location_update:'Дата обновления',
    responsible_text:'Отвественный',
    year:'Год',
    comment:'Комментарий',
    on_repair:'На ремонте',
    on_transition:'В пути',
;



class ToolManage extends Component {
    constructor(props) {
        super(props);
        this.state = { currentPage: 1 };
    }

    componentWillMount() {
        this.props.getProducts({ page: this.state.currentPage, page_size: 10});
    };

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
            <div className="tool-page-card">
                <Card className="tool-page-card">
                    <div className="fields-set">
                        {TOOL_FIELDS.map(param =>{
                            if(param === "location_update")
                                return <TextField floatingLabelText={}/>
                            }
                        )}
                    </div>
                </Card>
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

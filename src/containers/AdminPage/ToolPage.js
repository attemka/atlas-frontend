import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import Checkbox from "material-ui/Checkbox";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import { Card, CardText, CardHeader, CardActions } from "material-ui/Card";
import moment from "moment";
import api from "../../api";

import "./ToolPage.scss";
import { getProductById, updateProductById, createProduct } from "../../actions/ProductsActions";

const TOOL_FIELDS = {
  number: "Номер",
  number_for_order: "Номер для заказа",
  name: "Имя",
  title: "Название",
  responsible: "Отвественный",
  year: "Год",
  comment: "Комментарий",
  on_repair: "На ремонте",
  on_transition: "В пути"
};

class ToolPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const id = this.props.match.params["id"];
    this.props.getAccounts();
    if (id) {
      this.props.getProductById(parseInt(id, 10)).then(response => {
        this.setState(response.data.data);
      });
    }
  }

  handleFieldChange = (event, value) => {
    this.setState({ [event.target.name]: value });
  };
  saveChanges = () => {
    const id = this.props.match.params["id"];
    const data = {};
    Object.keys(TOOL_FIELDS).map(key => (data[key] = this.state[key]));
    if (id) {
      this.props.updateProductById(id, data);
    } else {
      this.props.createProduct(data);
    }
  };

  render() {
    const { profile } = this.props;
    if (!profile.is_admin) this.props.history.push("/");
    return (
      <div className="tool-page-wrapper">
        <Card className="tool-page-card">
          <div className="fields-set">
            {Object.keys(TOOL_FIELDS).map(param => {
              if (param === "on_repair" || param === "on_transition")
                return (
                  <Checkbox
                    className="checkbox-item"
                    name={param}
                    label={TOOL_FIELDS[param]}
                    checked={this.state[param]}
                    onCheck={this.handleFieldChange}
                  />
                );
              else if (param === "responsible") {
                return (
                  <SelectField floatingLabelText={TOOL_FIELDS[param]}>
                    {this.props.accounts.map(account => <MenuItem value={account.id} primaryText={account.name} />)}
                  </SelectField>
                );
              } else
                return (
                  <TextField
                    name={param}
                    floatingLabelText={TOOL_FIELDS[param]}
                    value={this.state[param] || ""}
                    onChange={this.handleFieldChange}
                  />
                );
            })}
          </div>
          <CardActions className="card-actions">
            <RaisedButton label="Сохранить" onClick={this.saveChanges} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profileData,
  accounts: state.admin_accounts.accountList
});

const mapDispatchToProps = {
  getAccounts: api.actions.admin_accounts.index,
  getProductById,
  updateProductById,
  createProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolPage);

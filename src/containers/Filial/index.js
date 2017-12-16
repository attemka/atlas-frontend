import React, { Component } from "react";
import { connect } from "react-redux";
import { changeFilial, addStaff } from "../../actions/ProfileActions";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardHeader } from "material-ui/Card";
import Subheader from "material-ui/Subheader";

import "./Filial.scss";

class Filial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.profile.account.name,
      staffEmail: ""
    };
  }

  changeName = name => {
    this.setState({ name });
  };

  saveProfile = () => {
    this.props.saveProfile(this.state);
  };
  changeProfileName = () => {
    this.props.changeFilial({ name: this.state.name });
  };

  changeStaffEmail = email => {
    this.setState({ staffEmail: email });
  };

  addStaff = () => {
    this.props.addStaff(this.state.staffEmail);
    this.setState({ staffEmail: "" });
  }

  render() {
    const { profile } = this.props;
    console.log(profile.account);
    // if (!profile.account.isAdmin) this.props.history.push('/');
    return (
      <div className="filial-wrapper">
        <Card className="filial-card">
          <CardHeader title="Управление филиалом" showExpandableButton={false} />
          <div className="label">Изменить имя филиала:</div>
          <div className="input-block">
          <TextField
            className="filial-input-field"
            name="filial-name"
            floatingLabelText="Имя"
            value={this.state.name}
            onChange={e => this.changeName(e.target.value)}
          />
          <RaisedButton className="filial-save-btn" label={"Сохранить"} primary onClick={this.changeProfileName} />
          </div>
          <div className="label"> Добавить сотрудника в филиал:</div>
          <div className="input-block">
          <TextField
            className="filial-input-field"
            name="add-stuff"
            floatingLabelText="E-mail сотрудника"
            value={this.state.staffEmail}
            onChange={e => this.changeStaffEmail(e.target.value)}
          />
          <RaisedButton className="filial-save-btn" label={"Добавить"} primary onClick={this.addStaff} />
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profileData
});

const mapDispatchToProps = {
  changeFilial,
  addStaff
};

export default connect(mapStateToProps, mapDispatchToProps)(Filial);

import React, { Component } from "react";
import { connect } from "react-redux";
import { saveProfile, getProfile } from "../../actions/ProfileActions";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardHeader } from "material-ui/Card";
import Subheader from "material-ui/Subheader";

import "./Profile.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.profile.name
    };
  }

  changeName = name => {
    this.setState({ name });
  };

  saveProfile = () => {
    this.props.saveProfile(this.state);
  };

  render() {
    const {profile} = this.props;

    return (
      <div className="profile-wrapper">
        <Card className="profile-card">
          <CardHeader
            title="Профиль"
            subtitle={
              profile.is_admin
                ? `Админ в ${profile.account.name}`
                : `Сотрудник в ${profile.account.name}`
            }
            showExpandableButton={false}
          />
          <TextField
            className="profile-input-field"
            name="Имя"
            floatingLabelText="Имя"
            value={this.state.name}
            onChange={e => this.changeName(e.target.value)}
          />
          <RaisedButton className="profile-save-btn" label="Сохранить" primary onClick={this.saveProfile} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profileData
});

const mapDispatchToProps = {
  saveProfile,
  getProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

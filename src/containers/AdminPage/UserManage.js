import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/ProfileActions";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardHeader } from "material-ui/Card";
import Subheader from "material-ui/Subheader";

import "./index.scss";

class UserManage extends Component {
  constructor(props) {
    super(props);
    props.getUsers();
  }

  render() {
    const { profile, userList } = this.props;
    if (!profile.is_admin) this.props.history.push("/");
    return (
      <div className="user-manage-wrapper">
        <Card className="user-manage-card">
          <div className="users">{userList && userList.map(user => <Card>{user}</Card>)}</div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profileData,
  userList: state.profile.userList
});

const mapDispatchToProps = {
  getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

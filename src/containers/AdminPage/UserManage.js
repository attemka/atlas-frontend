import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers, deleteUserById } from "../../actions/ProfileActions";
import { getAllAccounts } from "../../actions/RequestsActions";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardText, CardHeader } from "material-ui/Card";
import Subheader from "material-ui/Subheader";

import "./UserManage.scss";

class UserManage extends Component {
  constructor(props) {
    super(props);
    props.getUsers();
    props.getAllAccounts();
    this.state = {};
  }

  deleteUser = userId => {
    this.props.deleteUserById(userId).then(() => this.props.getUsers());
    this.setState({[userId]: false});
  };

  handleExpandChange = (userId, expanded) => {
    this.setState({ [userId]: expanded });
  };

  render() {
    const { profile, userList } = this.props;
    if (!profile.is_admin) this.props.history.push("/");
    return (
      <div className="user-manage-wrapper">
        <Card className="user-manage-card">
          <div className="users">
            {userList &&
              userList.map(user => (
                <Card
                  expanded={this.state[user.id] === true}
                  onExpandChange={this.handleExpandChange.bind(this, user.id)}
                  className={`single-user-card${this.state[user.id] === true ? "-expanded" : ""}`}
                >
                  <div actAsExpander={true}>
                    <div className="param">
                      <span className="param-title">E-mail: </span>
                      {user.email}
                    </div>
                    <div className="param">
                      <span className="param-title">Имя: </span>
                      {user.name}
                    </div>
                  </div>
                  <CardText expandable={true}>
                    <RaisedButton label="Удалить" onClick={() => this.deleteUser(user.id)} />
                  </CardText>
                </Card>
              ))}
          </div>
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
  getUsers,
  getAllAccounts,
  deleteUserById
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

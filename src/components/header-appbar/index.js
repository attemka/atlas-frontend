import React, { Component } from "react";
import "./header-appbar.scss";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

class HeaderAppbar extends Component {
  render() {
    const { isLogged, userName, isAdmin } = this.props;

    const Login = () => <FlatButton href="/login" label="Логин" />;

    const Logged = () => (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        targetOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem primaryText="Управление аккаунтом" />
        <MenuItem primaryText="Управление филиалом" />
        <MenuItem primaryText="Выход" />
      </IconMenu>
    );

    return (
      <AppBar
        iconElementLeft={<span />}
        title="Atlas-CopCo"
        iconElementRight={isLogged ? <Logged /> : <Login />}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.authenticated,
  userName: state.profile.profileData.name,
  isAdmin: state.profile.profileData.isAdmin
});

export default connect(mapStateToProps)(HeaderAppbar);

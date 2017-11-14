import React, { Component } from "react";
import "./header-appbar.scss";
import {connect} from 'react-redux'

class HeaderAppbar extends Component {
  render() {
    const { isLogged, userName } = this.props;
    return (
      <div className="header-appbar">
        {isLogged ? <div className="user-page">Hello, {userName}</div> : <button className="header-login-btn">Login</button>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.authenticated,
  userName: state.profile.profileData.name
})

export default connect(mapStateToProps)(HeaderAppbar);

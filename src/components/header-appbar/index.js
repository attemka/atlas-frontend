import React, { Component } from 'react';
import "./header-appbar.scss";

class HeaderAppbar extends Component{
  render(){
    const {isLogged, isAdmin, userName} = this.props;
    return(
      <div className="header-appbar">
        {isLogged ? <div className="user-page">Hello, {userName}</div> : <button className="login-btn">Login</button>}
      </div>
    )
  }
}

export default HeaderAppbar;

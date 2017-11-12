import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../hoc/with-router";

import HeaderAppbar from "../components/header-appbar";

class App extends Component {
  render() {
    return (
      <div className={"wrap"}>
      <HeaderAppbar isLogged={true} isAdmin={false} userName={"attemka"}/>
    <div className="content">{this.props.children}</div>
      </div>
    )
  }
}

export default App;

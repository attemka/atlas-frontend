import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../hoc/with-router";

import HeaderAppbar from "../components/header-appbar";

class App extends Component {
  render() {
    return <HeaderAppbar isLogged={true} isAdmin={false} userName={"attemka"} />;
  }
}

export default App;

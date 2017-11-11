import React, { Component } from "react";
import { connect } from "react-redux";

import HeaderAppbar from "../components/header-appbar";

class App extends Component {
  render() {
    return (
        <HeaderAppbar isLogged={true} isAdmin={false} userName={"attemka"} />
    )
  }
}

export default App;

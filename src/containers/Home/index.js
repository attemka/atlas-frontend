import React, { Component } from "react";
import "./Home.scss";
import Table from '../../components/Table/Table'

class Home extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <div className="table">
          <Table/>
        </div>
      </div>
    );
  }
}

export default Home;

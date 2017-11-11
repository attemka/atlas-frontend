import React, { Component } from "react";
import "./Table.scss";
import "react-table/react-table.css";
import ReactTable from "react-table";

class Table extends Component {
  constructor() {
    super();
    this.state = {
      data: ""
    };
    this.fetchData();
  }
  fetchData() {
    let params = {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: {
        Authorization: "Token a2lsaW1hbmdhcmFAeWFuZGV4LnJ1OjEzMTE5Ng=="
      }
    };

    fetch("https://attemka.ru/products/all", params)
      .then(result => result.json())
      .then(result => this.setState({ data: result.data.results }));
  }

  render() {
    let { data } = this.state;
    console.log(data);
    return (
      <div className="table">
        {data && (
          <ReactTable
            data={data}
            manual
            showPageSizeOptions={false}
            columns={[
              {
                Header: "ID",
                accessor: "id"
              },
              {
                Header: "Название",
                accessor: "title"
              },
              {
                Header: "Год",
                accessor: "year"
              },
              {
                Header: "Ответственный",
                accessor: "responsible_text"
              },
              {
                Header: "Когда",
                accessor: "location_update"
              },
              {
                Header: "Комментарий",
                accessor: "comment"
              }
            ]}
          />
        )}
      </div>
    );
  }
}

export default Table;

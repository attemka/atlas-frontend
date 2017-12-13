import React, { Component } from "react";
import "./Home.scss";
import Table from '../../components/Table/Table'
import RaisedButton from "material-ui/RaisedButton";
import {loadTypeFilters, loadInnerTypeFilters} from '../../actions/FilterActions'
import { connect } from 'react-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const buttonStyle = {
  margin:12,
}

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      typeFilter:''
    }
  }

  componentWillMount = ()=> {
    this.props.loadTypeFilters()
  }

  filterPicked = (typeFilter) => {
    this.setState({
      typeFilter
    })
  }

  renderOneFilter = (filterType, i) => {
    return this.state.typeFilter === filterType ? <RaisedButton key={i} label={filterType} primary style={buttonStyle}/>
      : <RaisedButton key={i} label={filterType} style={buttonStyle} onClick={this.filterPicked.bind(this, filterType)}/>
  }

  renderFilterTypes = () => {
    if(!this.props.filterTypes.length) return null
    return (
      <div>
        { this.props.filterTypes.map(this.renderOneFilter)}
      </div>)
  }

  render() {
    return (
      <div className="home-wrapper">
        {this.renderFilterTypes()}
          <Card style={{margin:12}}>
            <Table typeFilter={this.state.typeFilter}/>
          </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filterTypes: state.filters.filterTypes
})

export default connect(mapStateToProps, {loadTypeFilters})(Home)

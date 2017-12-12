import React, {Component} from 'react'
import { connect } from 'react-redux'
import {saveProfile, getProfile} from '../../actions/ProfileActions'
import "./Profile.scss"
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardHeader } from "material-ui/Card";
import Subheader from 'material-ui/Subheader';

const style = {
  display: "flex",
  margin: "auto",
  flexDirection: "column",
  padding: 20
};

const fieldStyle = {
  display: "block",
  margin: '10px',
};

const slideDown = {
  display: "block",
  marginTop: "10px"
};

class Profile extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: this.props.profile.name
    }
  }

  changeName = (name) => {
    this.setState({
      ...this.state,
      name
    })
  }

  saveProfile = ()=>{
    this.props.saveProfile(this.state)
  }

  render(){
    return (<div className="profile-wrapper">
      <Card style={style}>
        <CardHeader
          title="Профиль"
          subtitle={ this.props.profile.is_admin ? `Админ в ${this.props.profile.account.name}`:
            `Сотрудник в ${this.props.profile.account.name}`}
          showExpandableButton={false}/>
        <TextField
          style={fieldStyle}
          name="Имя"
          floatingLabelText="Имя"
          value={this.state.name}
          onChange={e => this.changeName(e.target.value)}/>

        <RaisedButton label={'Сохранить'} primary style={slideDown} onClick={this.saveProfile}  />
      </Card>
    </div>)
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profileData
})

const mapDispatchToProps = {
  saveProfile,
  getProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

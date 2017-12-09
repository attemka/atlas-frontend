import React, {Component} from 'react'
import { connect } from 'react-redux'
import {saveProfile, getProfile} from '../../actions/ProfileActions'

class Profile extends Component {

  render(){

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

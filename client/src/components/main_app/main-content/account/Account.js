import React, { Component } from 'react'
import { connect } from 'react-redux'

import AccountInformations from './account_informations/AccountInformations'
import ExamsTable from './account_informations/exams_table/ExamsTable'

import './Account.css'

import { fetchUserData } from '../../../../actions/userActions'

import LoadingScreen from 'react-loading-screen'

class Account extends Component {

  render() {
    return (
      <div className="account">
        <AccountInformations userData={this.props.userData} />
        <ExamsTable examsData={this.props.userData.exams} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log(state)
  return {
    ...props,
    ...state
  }
}

export default connect(
  mapStateToProps,
  null
)(Account)

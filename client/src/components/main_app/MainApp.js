import React, { Component } from 'react'
import Header from './header/Header'

import './MainApp.css'
import MainContent from './main-content/MainContent'
import Footer from './footer/Footer'

import LoadingScreen from 'react-loading-screen'

import { connect } from 'react-redux'

import { fetchUserData } from '../../actions/userActions'

class MainApp extends Component {

  render() {
    return (
        <div className="main">
          <Header />
          <MainContent userData={this.props.userData}/>
          <Footer />
        </div>
    )
  }
}

const mapActionToProps = {
  fetchUserData
}

export default connect(
  null,
  mapActionToProps
)(MainApp)

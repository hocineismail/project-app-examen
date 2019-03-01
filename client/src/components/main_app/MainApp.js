import React, { Component } from 'react'
import Header from './header/Header'

import './MainApp.css'
import MainContent from './main-content/MainContent'
import Footer from './footer/Footer'

class MainApp extends Component {

  render() {
    return (
        <div className="main">
          <Header />
          <MainContent userData={this.props.userData} modules={this.props.modules} exams = {this.props.exams}/>
          <Footer />
        </div>
    )
  }
}


export default MainApp

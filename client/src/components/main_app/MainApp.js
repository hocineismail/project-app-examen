import React, { Component } from 'react'
import Header from './header/Header'

import './MainApp.css'
import MainContent from './main-content/MainContent'
import Footer from './footer/Footer'

class MainApp extends Component {

  render() {
    console.log('MAIN APP COMPONENT')
    return (
        <div className="main">
          <Header />
          <MainContent userData={this.props.userData} modules={this.props.modules}/>
          <Footer />
        </div>
    )
  }
}


export default MainApp

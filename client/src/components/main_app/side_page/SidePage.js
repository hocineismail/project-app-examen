import React, { Component } from 'react'

import './SidePage.css'
import SideMenu from './side-menu/SideMenu';

class SidePage extends Component {
  render() {
    return (
      <div className="side-bar">
        <h4>المواد</h4>
        <SideMenu modules = {this.props.modules}/>
      </div>
    )
  }
}

export default SidePage

import React from 'react'
import {Link} from 'react-router-dom'

const SideMenu = props => {
  return (
    <ul className="list-group">
      <li className="list-group-item active"><Link to='/studenthome'>جميع المواد</Link></li>
      <li className="list-group-item"><Link to='/studenthome'>المادة ١</Link></li>
      <li className="list-group-item"><Link to='/studenthome'>المادة ١</Link></li>
      <li className="list-group-item"><Link to='/studenthome'>المادة ١</Link></li>
      <li className="list-group-item"><Link to='/studenthome'>المادة ١</Link></li>
    </ul>
  )
}

export default SideMenu

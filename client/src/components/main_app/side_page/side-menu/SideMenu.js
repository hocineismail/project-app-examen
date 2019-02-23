import React from 'react'
import { Link } from 'react-router-dom'

const SideMenu = props => {
  return (
    <ul className="list-group">
      <li className="list-group-item active">
        <Link to="/studenthome">جميع المواد</Link>
      </li>
      {props.modules.map(module => {
        console.log(module)
        return (
          <li className="list-group-item">
            <Link to={`/studenthome?module=${module.Module}`}>
              {module.Module}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default SideMenu

import React from 'react'
import './Header.css'

import {Link} from 'react-router-dom'

const Header = props => {
    return(
        <div className='nav'>
            <h2>موقع</h2>
            <div className='menu'>
                <ul>
                    <li><Link to='/settings'>اعدادات</Link></li>
                    <li><Link to='/account'>حسابي</Link></li>
                    <li><Link to='/'>الرئيسية</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Header
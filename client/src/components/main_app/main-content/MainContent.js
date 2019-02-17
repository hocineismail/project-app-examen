import React, { Component } from 'react';
import SidePage from '../side_page/SidePage'

import './MainContent.css'

class MainContent extends Component {
    render() {
        return (
            <div className='main-content'>
                <SidePage />
            </div>
        );
    }
}

export default MainContent;
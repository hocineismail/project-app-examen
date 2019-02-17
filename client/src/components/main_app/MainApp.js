import React, { Component } from 'react';
import Header from './header/Header'

import './MainApp.css'
import MainContent from './main-content/MainContent';

class MainApp extends Component {
    render() {
        return (
            <div classNam="main">
                <Header/>
                <MainContent/>
            </div>
        );
    }
}

export default MainApp;
import React, { Component } from 'react';
import Header from './header/Header'

import './MainApp.css'
import MainContent from './main-content/MainContent';
import Footer from './footer/Footer';

class MainApp extends Component {
    render() {
        return (
            <div classNam="main">
                <Header/>
                <MainContent/>
                <Footer/>
            </div>
        );
    }
}

export default MainApp;
import React, { Component } from 'react';

import ExamWrapper from './module/ExamWrapper';
import SidePage from '../side_page/SidePage'
import ExamInformations from './examInformations/ExamInformations';
import Account from './account/Account'

import {Route} from 'react-router-dom'

import './MainContent.css'
import ProfileSettings from './settings/profile_settings/ProfileSettings';

class MainContent extends Component {
    render() {
        return (
            <div className='main-content'>
                <SidePage />
                <Route path='/studenthome' exact component={ExamWrapper}/>
                <Route path='/studenthome/exam/:name' exact component={ExamInformations}/>
                <Route path='/studenthome/account' exact component={Account}/>
                <Route path='/studenthome/settings' exact component={ProfileSettings}/>
            </div>
        );
    }
}

export default MainContent;
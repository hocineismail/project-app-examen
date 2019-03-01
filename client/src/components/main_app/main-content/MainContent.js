import React, { Component } from 'react';

import ExamWrapper from './module/ExamWrapper';
import SidePage from '../side_page/SidePage'
import ExamInformations from './examInformations/ExamInformations';
import Account from './account/Account'
import ProfileSettings from './settings/profile_settings/ProfileSettings';

import {Route} from 'react-router-dom'

import './MainContent.css'

class MainContent extends Component {
    render() {
        return (
            <div className='main-content'>
                <SidePage modules={this.props.modules} />
                <Route path='/studenthome' exact render={() => <ExamWrapper exams = {this.props.exams}/>}/>
                <Route path='/studenthome/exam/:name' exact component={ExamInformations}/>
                <Route path='/studenthome/account' exact component={Account}/>
                <Route path='/studenthome/settings' exact render={() => <ProfileSettings userData={this.props.userData}/>}/>
            </div>
        );
    }
}

export default MainContent;
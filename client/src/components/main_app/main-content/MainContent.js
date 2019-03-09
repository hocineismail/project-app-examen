import React, { Component } from 'react';

import ExamWrapper from './module/ExamWrapper';
import SidePage from '../side_page/SidePage'
import ExamInformations from './examInformations/ExamInformations';
import Account from './account/Account'
import ProfileSettings from './settings/profile_settings/ProfileSettings';

import {Route, Redirect, Switch} from 'react-router-dom'

import './MainContent.css'

class MainContent extends Component {
    render() {
        return (
            <div className='main-content'>
                <SidePage modules={this.props.modules} />
                <Switch>
                <Route path='/studenthome' exact render={() => <ExamWrapper exams = {this.props.exams}/>}/>
                <Route path='/studenthome/exam/:name' exact component={ExamInformations}/>
                <Route path='/studenthome/account' exact component={Account}/>
                <Route path='/studenthome/settings' exact render={() => <ProfileSettings choices={this.props.choices} userData={this.props.userData}/>}/>
                <Redirect to='/studenterror/404'/>
                </Switch>
            </div>
        );
    }
}

export default MainContent;
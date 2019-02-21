import React, { Component } from 'react';

import ProfileSettings from './profile_settings/ProfileSettings'

import './Settings.css'

class Settings extends Component {
    render() {
        return (
            <div className='account-settings'>
                <ProfileSettings/>
            </div>
        );
    }
}

export default Settings;
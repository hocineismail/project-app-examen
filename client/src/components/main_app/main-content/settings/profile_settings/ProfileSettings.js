import React, { Component } from 'react';

import './ProfileSettings.css'

import InformationsInput from './informations_input/InformationsInput';

import ManAvatar from './manavatar.png'
import Submit from './submit/Submit';

class ProfileSettings extends Component {
    render() {
        return (
            <div className='profile-settings card'>
                <img src={ManAvatar} className='avatar'/>
                <InformationsInput prop='الاسم' propValue='اسم عشوائي' type='text' editable={true}/>
                <InformationsInput prop='اللقب' propValue='لقب عشوائي' type='text' editable={true}/>
                <InformationsInput prop='تاريخ الميلاد' propValue='2019-02-19' type='date' editable={true}/>
                <InformationsInput prop='البريد الالكتروني' propValue='randomemail@email.com' type='email' editable={false}/>
                <InformationsInput prop='كلمة السر' propValue='randompassword' type='password' editable={true}/>
                <InformationsInput prop='الجنس' propValue='ذكر' type='choicebox' editable={true} choices={['ذكر', 'انثى']}/>
                <Submit/>
            </div>
        );
    }
}

export default ProfileSettings;
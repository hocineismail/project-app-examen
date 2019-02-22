import React, { Component } from 'react';

import './AccountInformations.css'

import ManAvatar from '../manavatar.png'
import WomanAvatar from '../womanavatar.png'

import PersonalInformations from './personal-informations/PersonalInformations'

class AccountInformations extends Component {
    render() {
        return (
            <div className='account-informations card'>
                <img className='avatar' src={ManAvatar}/>
                <div className='personal-informations'>
                    <PersonalInformations prop='الاسم' propValue='اسم افتراضي'/>
                    <PersonalInformations prop='اللقب' propValue='لقب افتراضي'/>
                    <PersonalInformations prop='تاريخ الميلاد' propValue='١٠ يناير ٢٠١٩'/>
                    <PersonalInformations prop='البريد الالكتروني' propValue='randomemail10930@email.com'/>
                    <PersonalInformations prop='رقم الهاتف' propValue='١٠٤٣٢٠٨٣٠'/>
                    <PersonalInformations prop='العنوان' propValue='٩٩, حي البدر, جدة'/>
                    <PersonalInformations prop='المستوى' propValue='السنة ٤'/>
                    <a className='btn btn-primary' href='/studenthome/settings'>تعديل الحساب</a>
                </div>
            </div>
        );
    }
}

export default AccountInformations;
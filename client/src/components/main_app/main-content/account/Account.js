import React, { Component } from 'react';

import AccountInformations from './account_informations/AccountInformations'
import ExamsTable from './account_informations/exams_table/ExamsTable'

import './Account.css'

class Account extends Component {
    render() {
        return (
            <div className='account'>
                <AccountInformations/>
                <ExamsTable/>
            </div>
        );
    }
}

export default Account;
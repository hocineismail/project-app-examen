import React, { Component } from 'react';

import ProfileSettings from './profile_settings/ProfileSettings'

import './Settings.css'

import {connect} from 'react-redux'

import {fetchUserData} from '../../../../actions/userActions'

class Settings extends Component {
    constructor(props){
        super(props)

        this.state = {
            userData: null
        }

    }
    componentDidMount(){
        this.props.fetchUserData(window.localStorage.getItem('_id'))
    }
    
    render() {
        return (
            <div className='account-settings'>
                <ProfileSettings userData = {this.props.userData}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        ...state
    }
}

const mapActionsToProps = {
    fetchUserData
}

export default connect(mapStateToProps, mapActionsToProps)(Settings);
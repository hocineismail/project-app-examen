import React, { Component } from 'react';
import Exam from '../../exam/Exam';

import './Module.css'

class Module extends Component {
    render() {
        return (
            <div className='module'>
                <h4>الامتحانات الاساسية</h4>
                <div className="dropdown-divider" />
                <div className='module-exams'>
                    <Exam/>
                    <Exam/>
                    <Exam/>
                </div>
            </div>
        );
    }
}

export default Module;
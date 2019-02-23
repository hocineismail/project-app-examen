import React, { Component } from 'react';
import Module from './Module';

import './ExamWrapper.css'

class ExamWrapper extends Component {
    render() {
        return (
            <div className='exam-wrapper card'>
                <h2>الامتحانات المتوفرة</h2>
                <div className='dropdown-divider'></div>
                {this.props.exams.map(moduleExams => <Module moduleExams = {moduleExams}/>)}
            </div>
        );
    }
}

export default ExamWrapper;
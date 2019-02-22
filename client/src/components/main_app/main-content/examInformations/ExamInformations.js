import React, { Component } from 'react';
import './ExamInformations.css'

import NewWindow from 'react-new-window'

class ExamInformations extends Component {

    onButtonClick(){
        window.open('/exampage', '_blank', 'location=yes,scrollbars=yes,status=yes')
    }

    render() {
        return (
            <div className='exam-informations card'>
                <h3>اسم {this.props.match.params.name}</h3>
                <div className='dropdown-divider'></div>
                <p>مثال عى نص قصير</p>
                <div className='take-exam'>
                <button type="button" class="btn btn-primary" onClick = {this.onButtonClick}>اختبر</button>
                </div>
            </div>
        );
    }
}

export default ExamInformations;
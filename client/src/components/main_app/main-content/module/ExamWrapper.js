import React, { Component } from 'react'
import Module from './Module'

import './ExamWrapper.css'

class ExamWrapper extends Component {
  render() {
    let querySelector = new URLSearchParams(window.location.search).get(
        'module'
      )
    let bodyComponent = (
        <div className="exam-wrapper card">
          <h2>الامتحانات المتوفرة</h2>
          <div className="dropdown-divider" />
          {this.props.exams.map(moduleExams => (
            <Module moduleExams={moduleExams} />
          ))}
        </div>
      )
    if (querySelector) {
        bodyComponent = (
            <div className="exam-wrapper card">
              <h2>الامتحانات المتوفرة</h2>
              <div className="dropdown-divider" />
              {this.props.exams.filter(moduleExams => moduleExams.Module === querySelector)
              .map(moduleExams => (
                <Module moduleExams={moduleExams} />
              ))}
            </div>
          )
    }
    return bodyComponent
  }
}

export default ExamWrapper

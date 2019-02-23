import React, { Component } from 'react'
import Exam from '../../exam/Exam'

import './Module.css'

class Module extends Component {
  render() {
    return (
      <div className="module">
        <h4>{this.props.moduleExams.Module}</h4>
        <div className="dropdown-divider" />
        <div className="module-exams">
          {this.props.moduleExams.Exams.map(exam => (
            <Exam
              title={exam.Exam}
              isOfficial={exam.IsOfficial}
              examId={exam._id}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Module

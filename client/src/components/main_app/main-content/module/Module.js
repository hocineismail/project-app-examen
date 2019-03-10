import React, { Component } from 'react'
import Exam from '../../exam/Exam'

import './Module.css'

class Module extends Component {
  render() {
    let bodyComponent
    if(this.props.moduleExams){
    bodyComponent = <div className="module">
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
  }else {
    bodyComponent = <div></div>
  }
    return bodyComponent
  }
}

export default Module

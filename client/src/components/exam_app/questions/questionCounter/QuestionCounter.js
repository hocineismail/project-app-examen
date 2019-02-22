import React from 'react'

import './QuestionCounter.css'

const QuestionCounter = props => {
  return (
    <div className="question-counter">
      <h4>السؤال رقم {props.totalQuestions}/{props.questionNumber}</h4>
      <div className='dropdown-divider'/>
    </div>
  )
}

export default QuestionCounter

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

import CountDown from 'react-countdown-now'

import './Questions.css'

import QuestionCounter from './questionCounter/QuestionCounter'
import Question from './question/Question'
import Confirmation from './Confirmation/Confirmation'

import { postExamGrade } from '../../../actions/userActions'

class Questions extends Component {
  constructor(props) {
    super(props)
    let questions = props.examQuestions

    this.state = {
      index: 0,
      questions: questions.map((q, k) => {
        return (
          <Question
            content={q}
            index={k}
            selectedResponse={window.localStorage.getItem(k)}
          />
        )
      }),
      time: parseInt(window.localStorage.getItem('time'))
        ? parseInt(window.localStorage.getItem('time'))
        : Date.now() + props.time * 60 * 1000
    }

    this.onNextButtonClick = this.onNextButtonClick.bind(this)
    this.onPreviousButtonClick = this.onPreviousButtonClick.bind(this)
    this.onExamFinished = this.onExamFinished.bind(this)
  }

  countDownRenderer({ minutes, seconds }) {
    window.localStorage.setItem(
      'time',
      Date.now() + minutes * 60 * 1000 + seconds * 1000
    )
    return (
      <div className="timer">
        <p>
          {' '}
          الوقت المتبقي: &nbsp;
          <span>
            {seconds} : {minutes}
          </span>
        </p>
      </div>
    )
  }

  onNextButtonClick() {
    this.setState({
      index: this.state.index + 1
    })
  }

  onPreviousButtonClick() {
    this.setState({
      index: this.state.index - 1
    })
  }

  onStartExamButtons() {
    return (
      <div className="submission">
        <button className="btn btn-primary" onClick={this.onNextButtonClick}>
          التالي
        </button>
      </div>
    )
  }

  duringExamButtons() {
    return (
      <div className="submission">
        <button
          className="btn btn-warning"
          onClick={this.onPreviousButtonClick}
        >
          العودة
        </button>
        <button className="btn btn-primary" onClick={this.onNextButtonClick}>
          التالي
        </button>
      </div>
    )
  }

  onLastExamQuestionButtons() {
    return (
      <div className="submission">
        <button
          className="btn btn-warning"
          onClick={this.onPreviousButtonClick}
        >
          العودة
        </button>
        <button className="btn btn-success" onClick={this.onNextButtonClick}>
          اكمال
        </button>
      </div>
    )
  }

  onFinishingExamButtons() {
    return (
      <div className="submission">
        <button
          className="btn btn-warning"
          onClick={this.onPreviousButtonClick}
        >
          العودة
        </button>
        <button className="btn btn-success" onClick={this.onExamFinished}>
          متأكد
        </button>
      </div>
    )
  }

  onExamFinished() {
    let examId = this.props.examId
    let responses = []
    this.props.examQuestions.map((question, index) => {
      question.responses.map(response => {
        if (response.ResponseText === window.localStorage.getItem(index)) {
          responses.push(response._id)
        }
      })
    })

    let body = {
      examId,
      responses
    }
    this.props.postExamGrade(window.localStorage.getItem('_id'), body)
  }

  getExamButtons(index, length) {
    let buttons
    if (index === 0) {
      buttons = this.onStartExamButtons()
    } else if (index === length - 1) {
      buttons = this.onLastExamQuestionButtons()
    } else if (index === length) {
      buttons = this.onFinishingExamButtons()
    } else {
      buttons = this.duringExamButtons()
    }
    return buttons
  }

  getResponseSelected() {
    let response = window.localStorage.getItem(this.state.index)
    return response
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postedGrade) {
      alert(nextProps.grade)
      console.log(nextProps.correctResponses)
    }
  }

  render() {
    let questionSection =
      this.state.index < 4 ? (
        <React.Fragment>
          {this.state.questions[this.state.index]}
        </React.Fragment>
      ) : (
        <Confirmation />
      )

    let submission = this.getExamButtons(
      this.state.index,
      this.state.questions.length
    )

    return (
      <div className="exam-questions">
        <CountDown date={this.state.time} renderer={this.countDownRenderer} />
        <QuestionCounter
          totalQuestions={this.state.questions.length}
          questionNumber={this.state.index + 1}
        />
        {questionSection}
        {submission}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state,
    ...props
  }
}

const mapActionsToProps = {
  postExamGrade
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Questions)

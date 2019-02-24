import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingScreen from 'react-loading-screen'
import { Route, Switch } from 'react-router-dom'

import './ExamApp.css'

import Header from './header/Header'
import Instructions from './instructions/Instructions'
import Questions from './questions/Questions'

import { getExamQuestions } from '../../actions/userActions'

class ExamApp extends Component {
  constructor(props) {
    super(props)
    let id = new URLSearchParams(window.location.search).get('examId')

    this.state = {
      id
    }
  }

  componentDidMount() {
    this.props.getExamQuestions(this.state.id)
  }

  render() {
    return this.props.onExamInformation ? (
      <div className="exam-app">
        <Header examInformations={this.props.onExamInformation.examInfo} />
        <div className="exam-body card">
          <Switch>
            <Route
              path="/exampage"
              exact
              render={() => (
                <Instructions
                  examInformations={this.props.onExamInformation.examInfo}
                  id={this.state.id}
                />
              )}
            />
            <Route
              path="/exampage/questions"
              exact
              render={() => (
                <Questions
                  examQuestions={this.props.onExamInformation.questions}
                  time={this.props.onExamInformation.examInfo.Time}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    ) : (
      <LoadingScreen
        loading={true}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        text="تحميل ..."
      />
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
  getExamQuestions
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ExamApp)

import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import MainApp from './components/main_app/MainApp'
import ExamApp from './components/exam_app/ExamApp'

import _ from 'lodash'

import LoadingScreen from 'react-loading-screen'

import { connect } from 'react-redux'

import { fetchUserData, getStudentModules, getStudentExams} from './actions/userActions'

class AppRoutes extends Component {
  constructor(props) {
    super(props)
    console.log('Constructor')
    this.state = {
      dataUserLoaded: false,
      dataModulesLoaded: false
    }
  }
  componentDidMount() {
    console.log('Constructor')
    this.props.fetchUserData(window.localStorage.getItem('_id'))
    this.props.getStudentModules(window.localStorage.getItem('_id'))
    this.props.getStudentExams(window.localStorage.getItem('_id'))
  }

  render() {
    console.log('userData:', this.props.userData )
    console.log('studentModules:', this.props.studentModules )
    return  this.props.userData && this.props.studentModules && this.props.studentExams ? (
      <BrowserRouter>
        <Switch>
          {console.log(this.props.userData)}
          <Route path={'/exampage'} component={ExamApp} />
          <Route
            path={'/studenthome'}
            render={() => (
              <MainApp
                userData={this.props.userData}
                modules={this.props.studentModules}
                exams = {this.props.studentExams}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    ) : (
      <LoadingScreen
        loading={this.state.isLoading}
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
    ...props,
    ...state
  }
}

const mapActionsToProps = {
  fetchUserData,
  getStudentModules,
  getStudentExams
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AppRoutes)

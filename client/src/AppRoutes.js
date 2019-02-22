import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import MainApp from './components/main_app/MainApp'
import ExamApp from './components/exam_app/ExamApp'

import LoadingScreen from 'react-loading-screen'

import { connect } from 'react-redux'

import { fetchUserData } from './actions/userActions'

class AppRoutes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }

  }
  componentDidMount() {
    this.props.fetchUserData(window.localStorage.getItem('_id'))
    console.log('component Did mount')
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.userData) {
      if (!nextProps.error) {
        this.setState({
          isLoading: false
        })
      }
    }
  }

  render() {
    return this.props.userData ? (
      <BrowserRouter>
          <Switch>
            <Route path={'/exampage'} component={ExamApp} />
            <Route path={'/studenthome'} render={() => <MainApp userData={this.props.userData}/>} />
          </Switch>
      </BrowserRouter>
    ) : (<LoadingScreen
      loading={this.state.isLoading}
      bgColor="#f1f1f1"
      spinnerColor="#9ee5f8"
      textColor="#676767"
      text="تحميل ..."
    />)
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    ...state
  }
}

const mapActionsToProps = {
  fetchUserData
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AppRoutes)

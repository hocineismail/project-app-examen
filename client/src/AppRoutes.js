import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import MainApp from './components/main_app/MainApp';
import ExamApp from './components/exam_app/ExamApp';
class AppRoutes extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route path={'/exampage'} component={ExamApp}/>
        <Route path={'/studenthome'} component={MainApp}/>
      </Switch>
      </BrowserRouter>  
    );
  }
}

export default AppRoutes;

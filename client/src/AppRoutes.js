import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import MainApp from './components/main_app/MainApp';
class AppRoutes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route location={'/'} component={MainApp}/>
      </BrowserRouter>  
    );
  }
}

export default AppRoutes;

import React, { Component } from 'react'

import './ExamApp.css'

import Header from './header/Header'
import Instructions from './instructions/Instructions'

import { Route } from 'react-router-dom'
import Questions from './questions/Questions';

class ExamApp extends Component {
  render() {
    return (
      <div className="exam-app">
        <Header />
        <div className="exam-body card">
          <Route path="/exampage" exact component={Instructions} />
          <Route path="/exampage/questions" exact component={Questions} />
        </div>
      </div>
    )
  }
}

export default ExamApp

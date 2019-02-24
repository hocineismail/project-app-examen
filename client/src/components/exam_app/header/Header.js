import React from 'react'

import './Header.css'

const Header = props => {
  return (
    <nav className="navbar navbar-light bg-light exam-navbar">
      <h1>{props.examInformations.Exam} رقم: {props.examInformations.NumberOfExam}</h1>
    </nav>
  )
}

export default Header

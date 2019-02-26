import React, { Component } from 'react'
import './certificate.css'
import certificateImage from './certificate.png'

class Certificate extends Component {
  render() {
      console.log('COUCOu')
    return (
      <div className="certificate">
        <img src={certificateImage} alt='certificate'/>
        <h2 className="certificate-exam">اسم الامتحان</h2>
        <h2 className="certificate-name">اسم المستبيسبيسخدم</h2>
      </div>
    )
  }
}

export default Certificate

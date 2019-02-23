import React from 'react'

import { connect } from 'react-redux'

import { postUserData } from '../../../../../../actions/userActions'

import './Submit.css'

const Submit = props => {
  return (
    <div className="settings-form">
      <button className="btn btn-success" onClick={onButtonClicked}>حفظ</button>
      <button className="btn btn-warning">الغاء</button>
    </div>
  )
}

function onButtonClicked(){
    console.log( document.querySelector('#semster'))
    let body = {
        Firstname : document.querySelector('#Firstnamme').value,
        Lastname : document.querySelector('#Lastname').value,
        Phone : document.querySelector('#Phone').value,
        Address : document.querySelector('#Address').value,
        Birthday : document.querySelector('#Birthday').value,
        Sexe : document.querySelector('#Sexe').value,
        Phase : document.querySelector('#Phase').value,
        Level : document.querySelector('#Level').value,
    }
    console.log(body)
}

const mapActionsToProps = {
  postUserData
}
const mapStateToProps = (state, props) => {
    return {
        ...props,
        ...state
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Submit)

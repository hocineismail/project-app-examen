import React from 'react'

import { connect } from 'react-redux'

import { postUserData } from '../../../../../../actions/userActions'

import './Submit.css'

class Submit extends React.Component {


  onButtonClicked() {
    let body = {
      Firstname: document.querySelector('#Firstname').value,
      Lastname: document.querySelector('#Lastname').value,
      Phone: document.querySelector('#Phone').value,
      Address: document.querySelector('#Address').value,
      Birthday: document.querySelector('#Birthday').value,
      Sexe: document.querySelector('#Sexe').value,
      Phase: document.querySelector('#Phase').value,
      Level: document.querySelector('#Level').value,
      semster: document.querySelector('#semster').value
    }

    this.props.postUserData(window.localStorage.getItem('_id'), body)
  }

  render() {
    return (
      <div className="settings-form">
        <button className="btn btn-success" onClick={this.onButtonClicked.bind(this)}>
          حفظ
        </button>
        <button className="btn btn-warning">الغاء</button>
      </div>
    )
  }
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Submit)

import React from 'react'

import { connect } from 'react-redux'

import { postUserData } from '../../../../../../actions/userActions'

import Swal from 'sweetalert2'

import './Submit.css'

class Submit extends React.Component {
  onSaveButtonClicked() {
    let Birthday = document.querySelector('#Birthday').value
      ? document.querySelector('#Birthday').value
      : null
    let body = {
      Firstname: document.querySelector('#Firstname').value,
      Lastname: document.querySelector('#Lastname').value,
      Phone: document.querySelector('#Phone').value,
      Address: document.querySelector('#Address').value,
      Birthday,
      Sexe: document.querySelector('#Sexe').value,
      Phase: document.querySelector('#Phase').value,
      Level: document.querySelector('#Level').value,
      semster: document.querySelector('#semster').value
    }
    console.log(body.Birthday)
    let password = document.querySelector('#Password').value
    if (password !== '') {
      body.password = password
    }

    this.props.postUserData(window.localStorage.getItem('_id'), body)

    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'تم تعديل الحساب بنجاح',
      showConfirmButton: false,
      timer: 1500
    }).then(r => {
      window.location.href = '/studenthome/account'
    })
  }

  onCancleButtonClicked() {
    window.location.href = '/studenthome/account'
  }

  render() {
    return (
      <div className="settings-form">
        <button
          className="btn btn-success"
          onClick={this.onSaveButtonClicked.bind(this)}
        >
          حفظ
        </button>
        <button
          className="btn btn-warning"
          onClick={this.onCancleButtonClicked}
        >
          الغاء
        </button>
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

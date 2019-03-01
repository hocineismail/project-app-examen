import React, { Component } from 'react'

import './AccountInformations.css'

import ManAvatar from '../manavatar.png'
import WomanAvatar from '../womanavatar.png'

import PersonalInformations from './personal-informations/PersonalInformations'

class AccountInformations extends Component {
  render() {
    let Birthdate = new Date(this.props.userData.Birthday)
    let month =
      Birthdate.getMonth() + 1 < 10
        ? '0' + (Birthdate.getMonth() + 1)
        : Birthdate.getMonth() + 1
    return (
      <div className="account-informations card">
        <img
          className="avatar"
          src={this.props.userData.Sexe === 'ذكر' ? ManAvatar : WomanAvatar}
          alt="Student Avatar"
        />
        <div className="personal-informations">
          <PersonalInformations
            prop="الاسم"
            propValue={this.props.userData.Firstname}
          />
          <PersonalInformations
            prop="اللقب"
            propValue={this.props.userData.Lastname}
          />
          <PersonalInformations
            prop="تاريخ الميلاد"
            propValue={
              Birthdate.getDate() + '/' + month + '/' + Birthdate.getFullYear()
            }
          />
          <PersonalInformations
            prop="البريد الالكتروني"
            propValue={this.props.userData.email}
          />
          <PersonalInformations
            prop="رقم الهاتف"
            propValue={this.props.userData.Phone}
          />
          <PersonalInformations
            prop="العنوان"
            propValue={this.props.userData.Address}
          />
          <PersonalInformations
            prop="المستوى"
            propValue={
              this.props.userData.Phase.Phase +
              ', ' +
              this.props.userData.Level.Level +
              ', ' +
              this.props.userData.semster.Semster
            }
          />
          <a className="btn btn-primary" href="/studenthome/settings">
            تعديل الحساب
          </a>
        </div>
      </div>
    )
  }
}

export default AccountInformations

import React, { Component } from 'react'

import './ProfileSettings.css'

import InformationsInput from './informations_input/InformationsInput'

import ManAvatar from './manavatar.png'
import WomanAvatar from './womanavatar.png'
import Submit from './submit/Submit'

class ProfileSettings extends Component {
  render() {
    let birthdate = new Date(this.props.userData.Birthday)
    let day = birthdate.getDate()
    if (day < 10) {
      day = '0' + day
    }
    let month = birthdate.getMonth()
    if (month < 10) {
      month = '0' + month
    }
    let year = birthdate.getFullYear()

    let level = [
      'الصف الاول',
      'الصف الثاني',
      'الصف الثالث',
      'الصف الرابع',
      'الصف الخامس'
    ]
    if (this.props.userData.Phase.Phase === 'الاكمالية') {
      level = ['الفصل الاول', 'الفصل الثاني', 'الفصل الثالث', 'الفصل الرابع']
    } else if (this.props.userData.Phase.Phase === 'الثانوية') {
      level = ['الفصل الاول', 'الفصل الثاني', 'الفصل الثالث']
    }
    console.log(day + '-' + month + '-' + year)
    return (
      <div className="profile-settings card">
        <img src={this.props.userData.Sexe === 'ذكر' ? ManAvatar : WomanAvatar} alt="Student Avatar" className="avatar" />
        <InformationsInput
          prop="الاسم"
          propValue={this.props.userData.Firstname}
          type="text"
          editable={true}
          id="Firstname"
        />
        <InformationsInput
          prop="اللقب"
          propValue={this.props.userData.Lastname}
          type="text"
          editable={true}
          id="Lastname"
        />
        <InformationsInput
          prop="رقم الهاتف"
          propValue={this.props.userData.Phone}
          type="number"
          editable={true}
          id="Phone"
        />
        <InformationsInput
          prop="العنوان"
          propValue={this.props.userData.Address}
          type="text"
          editable={true}
          id='Address'
        />
        <InformationsInput
          prop="تاريخ الميلاد"
          propValue={year + '-' + month + '-' + day}
          type="date"
          editable={true}
          id='Birthday'
        />
        <InformationsInput
          prop="البريد الالكتروني"
          propValue={this.props.userData.email}
          type="email"
          editable={false}
          id='email'
        />
        <InformationsInput
          prop="كلمة السر"
          propValue="dont even try babe!"
          type="password"
          editable={true}
        />
        <InformationsInput
          prop="الجنس"
          propValue={this.props.userData.Sexe}
          type="choicebox"
          editable={true}
          choices={['ذكر', 'انثى']}
          id='Sexe'
        />
        <InformationsInput
          prop="المرحلة"
          propValue={this.props.userData.Phase.Phase}
          type="choicebox"
          editable={true}
          id='Level'
          choices={['الابتدائية', 'الاكمالية', 'الثانوية']}
        />
        <InformationsInput
          prop="الصف"
          propValue={this.props.userData.Level.Level}
          type="choicebox"
          editable={true}
          id='Phase'
          choices={level}
        />
        <InformationsInput
          prop="الثلاثي"
          propValue={this.props.userData.semster.Semster}
          type="choicebox"
          id='semster'
          editable={true}
          choices={['الثلاثي الاول', 'الثلاثي الثاني', 'الثلاثي الثالث']}
        />
        <Submit />
      </div>
    )
  }
}

export default ProfileSettings

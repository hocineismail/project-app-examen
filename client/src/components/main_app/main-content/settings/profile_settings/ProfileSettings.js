import React, { Component } from 'react'

import './ProfileSettings.css'

import InformationsInput from './informations_input/InformationsInput'

import ManAvatar from './manavatar.png'
import WomanAvatar from './womanavatar.png'
import Submit from './submit/Submit'

class ProfileSettings extends Component {
  constructor(props) {
    super(props)
    let level = [
      'الصف الاول',
      'الصف الثاني',
      'الصف الثالث',
      'الصف الرابع',
      'الصف الخامس'
    ]

    if (props.userData.Phase.Phase === 'المتوسطة') {
      level = ['الصف الاول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع']
    } else if (props.userData.Phase.Phase === 'الثانوية') {
      level = ['الصف الاول', 'الصف الثاني', 'الصف الثالث']
    }
    this.state = {
      Semster: ['الثلاثي الاول', 'الثلاثي الثاني', 'الثلاثي الثالث'],
      level
    }
    this.onPhaseChanges = this.onPhaseChanges.bind(this)
  }

  onPhaseChanges(e) {
    let phase = e.target.value
    if (phase === 'المتوسطة') {
      this.setState({
        level: ['الصف الاول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع']
      })
    } else if (phase === 'الثانوية') {
      this.setState({
        level: ['الصف الاول', 'الصف الثاني', 'الصف الثالث']
      })
    }else {
      this.setState({
        level: ['الصف الاول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع', 'الصف الخامس']
      })
    }
  }

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

    return (
      <div className="profile-settings card">
        <img
          src={this.props.userData.Sexe === 'ذكر' ? ManAvatar : WomanAvatar}
          alt="Student Avatar"
          className="avatar"
        />
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
          id="Address"
        />
        <InformationsInput
          prop="تاريخ الميلاد"
          propValue={year + '-' + month + '-' + day}
          type="date"
          editable={true}
          id="Birthday"
        />
        <InformationsInput
          prop="البريد الالكتروني"
          propValue={this.props.userData.email}
          type="email"
          editable={false}
          id="email"
        />
        <InformationsInput
          prop="كلمة السر"
          propValue={''}
          type="password"
          id="Password"
          editable={true}
        />
        <InformationsInput
          prop="الجنس"
          propValue={this.props.userData.Sexe}
          type="choicebox"
          editable={true}
          choices={['ذكر', 'انثى']}
          id="Sexe"
        />
        <InformationsInput
          prop="المرحلة"
          propValue={this.props.userData.Phase.Phase}
          type="choicebox"
          editable={true}
          id="Phase"
          choices={['الابتدائية', 'المتوسطة', 'الثانوية']}
          onChange={this.onPhaseChanges}
        />
        <InformationsInput
          prop="الصف"
          propValue={this.props.userData.Level.Level}
          type="choicebox"
          editable={true}
          id="Level"
          choices={this.state.level}
        />
        <InformationsInput
          prop="الثلاثي"
          propValue={this.props.userData.semster.Semster}
          type="choicebox"
          id="semster"
          editable={true}
          choices={this.state.Semster}
        />
        <Submit />
      </div>
    )
  }
}

export default ProfileSettings

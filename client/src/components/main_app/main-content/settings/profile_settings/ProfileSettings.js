import React, { Component } from 'react'

import './ProfileSettings.css'

import InformationsInput from './informations_input/InformationsInput'

import ManAvatar from './manavatar.png'
import WomanAvatar from './womanavatar.png'
import Submit from './submit/Submit'

class ProfileSettings extends Component {
  constructor(props) {
    super(props)

    let phases = []
    let levels = []
    let semster = []
    console.log(props.choices)
    for (let i = 0; i < props.choices.length; i++){
      phases.push(props.choices[i].Phase)
      if(props.choices[i].Phase === props.userData.Phase.Phase){
       for(let j = 0; j < props.choices[i].Levels.length; j++){
         levels.push(props.choices[i].Levels[j].Level)
          if(props.choices[i].Levels[j].Level === props.userData.Level.Level){
            for (let k = 0; k < props.choices[i].Levels[j].Semsters.length; k++){
              semster.push(props.choices[i].Levels[j].Semsters[k].Semster)
            }
          }
       } 
      }
    }

    this.state = {
      phases: phases,
      Semster: semster,
      level : levels,
      selectedPhase : props.userData.Phase.Phase,
      selectedLevel: props.userData.Level.Level
    }
    this.onPhaseChanges = this.onPhaseChanges.bind(this)
    this.onLevelChange = this.onLevelChange.bind(this)
  }

  onPhaseChanges(e) {
    let phase = e.target.value
    let levels = []
    let semster = []
    for(let i = 0 ; i < this.props.choices.length; i++){
      console.log('CHANGE')
      console.log(this.props.choices)
      if (phase === this.props.choices[i].Phase){
        for (let j = 0; j < this.props.choices[i].Levels.length; j++){
          levels.push(this.props.choices[i].Levels[j].Level)
        }
        for (let j = 0; j< this.props.choices[i].Levels[0].Semsters.length;j++){
          semster.push(this.props.choices[i].Levels[0].Semsters[j].Semster)
        }
      }
    }
    this.setState({
      Semster: semster,
      level : levels,
      selectedPhase: phase
    })
  }
  onLevelChange(e) {
    let level = e.target.value
    let semster = []
    for(let i = 0 ; i < this.props.choices.length; i++){
      if (this.props.choices[i].Phase === this.state.selectedPhase){
        for (let j = 0; j < this.props.choices[i].Levels.length; j++){
          if(this.props.choices[i].Levels[j].Level === level){
            for (let k = 0; k < this.props.choices[i].Levels[j].Semsters.length; k++){
              semster.push(this.props.choices[i].Levels[j].Semsters[k].Semster)
            }
          }
        }
      }
    }
    this.setState({
      Semster: semster 
    })
  
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
          choices={this.state.phases}
          onChange={this.onPhaseChanges}
        />
        <InformationsInput
          prop="الصف"
          propValue={this.props.userData.Level.Level}
          type="choicebox"
          editable={true}
          id="Level"
          choices={this.state.level}
          onChange={this.onLevelChange}
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

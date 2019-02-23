import React, { Component } from 'react'

import './ExamsTabel.css'

class ExamsTable extends Component {
  constructor(props){
    super(props)

    this.state = {
      exams: props.exams ? props.exams : []
    }
  }
  render() {
    return (
      <div className="exams-table card">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">الامتحان</th>
              <th scope="col">العلامة</th>
              <th scope="col">الشهادة</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exams.map((exam, key) => {
              return (
                <tr>
                  <th scope="row">{key}</th>
                  <td>{exam.Exam}</td>
                  <td>{exam.Grade}</td>
                  <td>غير متوفر</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ExamsTable

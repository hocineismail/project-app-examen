import React, { Component } from 'react'

import './ExamsTabel.css'

import fetchInfo from '../../../../../../fetchInfo'

class ExamsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exams: props.examsData ? props.examsData : []
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.examsData) {
      this.setState({
        exams: nextProps.examsData
      })
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
              <th scope="col">التاريخ</th>
              <th scope="col">العلامة</th>
              <th scope="col">الشهادة</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exams.map((exam, key) => {
              let date = new Date(exam.Date)
              let day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay()
              let month =
                date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
              let certificate =
                exam.Grade >= 50 ? (
                  <a
                    className="btn btn-info"
                    target="__blank"
                    href={`${fetchInfo.certificateUrl}/${exam.examName}&${
                      this.props.userName
                    }&${day + ' - ' + month + ' - ' + date.getFullYear()}`}
                  >
                    الشهادة
                  </a>
                ) : (
                  'الشهادة غير متوفرة'
                )
              return (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{exam.examName}</td>
                  <td>{day + ' - ' + month + ' - ' + date.getFullYear()}</td>
                  <td>{exam.Grade}</td>
                  <td>{certificate}</td>
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

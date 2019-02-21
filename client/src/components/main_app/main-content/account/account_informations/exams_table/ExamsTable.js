import React, { Component } from 'react'

import './ExamsTabel.css'

class ExamsTable extends Component {
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
            <tr>
              <th scope="row">1</th>
              <td>الجغرافية</td>
              <td>١٠.٠٠</td>
              <td>غير متوفر</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>العربية</td>
              <td>١٧.٠٠</td>
              <td>غير متوفر</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>الرياضيات</td>
              <td>٠٩.٠٠</td>
              <td>غير متوفر</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default ExamsTable

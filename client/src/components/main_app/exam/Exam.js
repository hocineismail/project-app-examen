import React from 'react'

const Exam = props => {
    return (
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">الامتحان الاول <span className="badge badge-success">اساسي</span></h5>
          <p className="card-text">ها الامتحان يختبر قدراتك في المادة الفلانية</p>
          <a href="/studenthome/exam/الامتحان-الاول" className="btn btn-primary">مزيد من المعلومات</a>
        </div>
      </div>
    )
}

export default Exam

import React from 'react'

const Exam = props => {
  let examTitle = <h5 className="card-title">{props.title}</h5>
  if (props.isOfficial) {
    examTitle = (
      <h5 className="card-title">
        {props.title} <span className="badge badge-success">اساسي</span>
      </h5>
    )
  }
  return (
    <div className="card">
      <div className="card-body">
        {examTitle}
        <p className="card-text">ها الامتحان يختبر قدراتك في المادة الفلانية</p>
        <a href="/studenthome/exam/الامتحان-الاول" className="btn btn-primary">
          مزيد من المعلومات
        </a>
      </div>
    </div>
  )
}

export default Exam

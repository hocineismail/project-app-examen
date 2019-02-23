import React from 'react'

class Exam extends React.Component {
  render() {
    let examTitle = <h5 className="card-title">{this.props.title}</h5>
    if (this.props.isOfficial) {
      examTitle = (
        <h5 className="card-title">
          {this.props.title} <span className="badge badge-success">اساسي</span>
        </h5>
      )
    }
    return (
      <div className="card">
        <div className="card-body">
          {examTitle}
          <p className="card-text">
            ها الامتحان يختبر قدراتك في المادة الفلانية
          </p>
          <a
            href={`/studenthome/exam/${this.props.examId}`}
            className="btn btn-primary"
          >
            مزيد من المعلومات
          </a>
        </div>
      </div>
    )
  }
}

export default Exam

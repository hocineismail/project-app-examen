import React, { Component } from 'react'
import './ExamInformations.css'

import LoadingScreen from 'react-loading-screen'
import Swal from 'sweetalert2'

import { connect } from 'react-redux'

import { getExamInformation } from '../../../../actions/userActions'

class ExamInformations extends Component {
  onButtonClick() {
    Swal.fire({
      title: 'هل انت متأكد؟',
      text:
        'لن يكون بامكانك اعادة الامتحان لاحقا, فلك الحق باجتياز الامتحان مرة واحدة',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'انا متأكد',
      cancelButtonText: 'الغاء'
    }).then(result => {
      if (result.value) {
        window.open(
          '/exampage',
          '_blank',
          'location=yes,scrollbars=yes,status=yes'
        )
      }
    })
  }

  componentDidMount() {
    this.props.getExamInformation(this.props.match.params.name)
  }

  render() {
    let official = null
    if (this.props.examInformations) {
      if (this.props.examInformations.IsOfficial) {
        official = <span className="badge badge-success">اساسي</span>
      }
    }
    return this.props.examInformations ? (
      <div className="exam-informations card">
        <h3>
          {this.props.examInformations.Exam} {official}
        </h3>
        <div className="dropdown-divider" />
        <p>هذا {this.props.examInformations.Exam} يختبر قدراتك في هذه المادة</p>
        <p>
          <bold>مدة الامتحان:</bold> {this.props.examInformations.Time} دقيقة
        </p>
        <p>
          <bold>رقم الامتحان:</bold> {this.props.examInformations.NumberOfExam}
        </p>
        <div className="take-exam">
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.onButtonClick}
          >
            اختبر
          </button>
        </div>
      </div>
    ) : (
      <LoadingScreen
        loading={true}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        text="تحميل ..."
      />
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    ...state
  }
}

const mapActionsToProps = {
  getExamInformation
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ExamInformations)

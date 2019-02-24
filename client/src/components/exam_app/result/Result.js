import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import renderHTML from 'react-render-html'

class Result extends React.Component {
  constructor(props) {
    super(props)

    console.log('RESULTs')
  }
  render() {
    console.log('RESULT RENDER')
    return (
      <div className="instructions">
        <h3>الاجابة النموذجية</h3>
        {this.props.correctResponses.map(response => {
          console.log(response)
          return (
            <React.Fragment>
              <p>
                <bold>السؤال {response.questionNumber}</bold>
              </p>
              {renderHTML(response.correctResponse)}
              <div className="dropdown-divider" />
            </React.Fragment>
          )
        })}
        <Link className="btn btn-primary" to={'/studenthome'}>
          العودة الى الصفحة الرئيسية
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state,
    ...props
  }
}

export default connect(
  mapStateToProps,
  null
)(Result)

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
    return this.props.correctResponses ? (
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
        <button
          className="btn btn-primary"
          onClick={() => {
            window.close()
          }}
        >
          العودة الى الصفحة الرئيسية
        </button>
      </div>
    ) : (
      <h1>Error !</h1>
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

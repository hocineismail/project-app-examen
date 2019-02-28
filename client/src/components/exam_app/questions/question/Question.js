import React from 'react'
import Responses from './Responses'

import './Question.css'
class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      responses: props.content.responses,
      selectedResponse: props.selectedResponse,
      index: props.index
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      responses: nextProps.content.responses,
      selectedResponse: nextProps.selectedResponse
    })
    this.forceUpdate()
  }

  render() {
    let image = this.props.content.question.QuestionImage ? (
      <img src = {this.props.content.question.QuestionImage} alt='question-img'/>
    ) : (null)
    return (
      <div className="question">
        <h4>{this.props.content.question.Question}</h4>
        {image}
        <Responses
          responses={this.state.responses}
          selectedResponse={this.state.selectedResponse}
          index={this.props.index}
        />
      </div>
    )
  }
}

export default Question

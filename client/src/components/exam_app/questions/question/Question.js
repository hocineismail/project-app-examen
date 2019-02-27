import React from 'react'
import Responses from './Responses'

class Question extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.content)
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
    return (
      <div className="question">
        <h4>{this.props.content.question.Question}</h4>
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

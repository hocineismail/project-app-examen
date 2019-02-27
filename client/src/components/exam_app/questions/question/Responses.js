import React from 'react'

import './Responses.css'
import Choice from './Choice'

class Responses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      responses: props.responses,
      selectedResponse: props.selectedResponse,
      index: props.index
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      responses: nextProps.responses,
      selectedResponse: nextProps.selectedResponse,
      index: nextProps.index
    })
  }

  render() {
    return (
      <div className="responses">
        {this.state.responses.map((r, k) => {
          let checked = this.state.checked
          if (this.state.selectedResponse === r.ResponseText) {
            checked = true
          }
          return (
            <Choice
              propValue={r.ResponseText}
              index={this.state.index}
              isChecked={checked}
              key={k}
              id={r}
            />
          )
        })}
      </div>
    )
  }
}
export default Responses

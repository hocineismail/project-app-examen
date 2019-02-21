import React from 'react'

import './Responses.css'
import Choice from './Choice'

import { Form } from 'semantic-ui-react'

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
          let checked = false
          console.log('Item:', r)
          console.log(this.state.selectedResponse)
          if (this.state.selectedResponse === r) {
            checked = true
            console.log('TRUE')
          }
          return (
            <Choice
              propValue={r}
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

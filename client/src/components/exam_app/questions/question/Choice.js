import React from 'react'

import { Form, Radio } from 'semantic-ui-react'

class Choice extends React.Component {
  constructor(props) {
    super(props)
    console.log('localstorage = ',window.localStorage.getItem(props.index))
    this.state = {
      isChecked : window.localStorage.getItem(props.index) === props.propValue? true : false,
      index: props.index
    }
    this.onRadioClick = this.onRadioClick.bind(this)
  }

  onRadioClick(value) {
    window.localStorage.setItem(this.props.index, value)
    this.setState({
      isChecked : true
    })
  }

  componentWillUpdate(){
  }

  componentWillUnmount(){
    document.querySelectorAll('.radio-response-btn').forEach(e => {e.checked = false })
  }

  render() {
    console.log(' ----------------- ')
    console.log('CHOICE COMPONENET')
    console.log('propValue:', this.props.propValue)
    console.log('index:', this.props.index)
    console.log('isChecked:', this.props.isChecked)
    console.log('')
    console.log('------------------')
    return (
      <div className="form-check card response-box">
        <input
          type="radio"
          value={this.props.propValue}
          name={this.props.index}
          className='radio-response-btn'
          onChange={() => {
          }}
          checked={this.props.isChecked}
          id = {this.props.id}
        />{' '}
        {this.props.propValue}
      </div>
    )
  }
}

export default Choice

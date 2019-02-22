import React from 'react'

import './InformationsInput.css'

class InformationsInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: props.propValue
    }

    this.onChangeInput = this.onChangeInput.bind(this)
  }

  onChangeInput(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    let input =
      this.props.type === 'choicebox' ? (
        <select class="form-control" className='input-prop-value'>
          {this.props.choices.map(c => {
            return (<option>{c}</option>)
          })}
        </select>
      ) : (
        <input
          type={this.props.type}
          readonly={!this.props.editable}
          className="form-control input-prop-value"
          onChange={this.onChangeInput}
          value={this.state.inputValue}
        />
      )

    return (
      <div className="informations-input">
        <p className="input-prop">{this.props.prop}: &nbsp;</p>
        {input}
      </div>
    )
  }
}

export default InformationsInput

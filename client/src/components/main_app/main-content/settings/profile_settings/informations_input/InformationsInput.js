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
        <select className='input-prop-value form-control' id={this.props.id} onChange={this.props.onChange}>
          {this.props.choices.map((c, k) => {
            if (c === this.props.propValue){
              return (<option value={c} selected={true} key={k}>{c}</option>)
            }else {
              return (<option key={k} value={c}>{c}</option>)
            }
          })}
        </select>
      ) : (
        <input
          type={this.props.type}
          id={this.props.id}
          readOnly={!this.props.editable}
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

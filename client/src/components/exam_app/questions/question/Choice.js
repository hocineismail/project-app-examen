import React from 'react'

class Choice extends React.Component {
  constructor(props) {
    super(props)
    let isChecked = false
    if (window.localStorage.getItem(this.props.index) === props.propValue) {
      isChecked = true
    }
    this.state = {
      isChecked: isChecked,
      index: props.index
    }
    this.onRadioClick = this.onRadioClick.bind(this)
  }

  onRadioClick(e) {
    window.localStorage.setItem(this.props.index, e.target.value)
    this.setState({
      isChecked: true
    })
  }

  componentWillReceiveProps(nextProps) {
    document.querySelectorAll('.radio-response-btn').forEach(e => {
      e.checked = false
    })

    if (window.localStorage.getItem(nextProps.index) === nextProps.propValue) {
      this.setState({
        isChecked: true
      })
    } else {
      this.setState({
        isChecked: false
      })
    }
  }

  componentDidMount() {
    if (
      window.localStorage.getItem(this.props.index) === this.props.propValue
    ) {
      this.setState({
        isChecked: true
      })
    } else {
      this.setState({
        isChecked: false
      })
    }
  }
  componentWillUnmount() {
    document.querySelectorAll('.radio-response-btn').forEach(e => {
      e.checked = false
    })
  }

  render() {
    let image = this.props.propImage ? (
      <img src={this.props.propImage} alt="response-img" />
    ) : null
    return (
      <div className="form-check card response-box">
        <input
          type="radio"
          value={this.props.propValue}
          name={this.props.index}
          className="radio-response-btn"
          onChange={this.onRadioClick}
          checked={this.state.isChecked}
          id={this.props.id}
        />
        {this.props.propValue}
        {image}
      </div>
    )
  }
}

export default Choice

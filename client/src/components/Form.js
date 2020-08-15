import React, { Component } from "react"

class Form extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.submit()
  }

  render() {
    return <form onSubmit={this.handleSubmit}>{this.props.elements()}</form>
  }
}

export default Form

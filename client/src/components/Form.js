import React, { Component } from "react"

export default class Form extends Component {
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

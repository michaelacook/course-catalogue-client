import React, { Component } from "react"

export default class Form extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.submit()
  }

  render() {
    return <form onSubmit={this.handleSubmit}>{this.props.elements()}</form>
  }
}

import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import Form from "./Form"

export default class UserSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
    }
  }

  submit = () => {
    const { history } = this.props
    const { firstName, lastName, emailAddress, password } = this.state
    this.props
      .signup({ firstName, lastName, emailAddress, password })
      .then(() => history.push("/signin"))
      .catch((errors) => {
        this.setState({
          errors: errors,
        })
      })
  }

  cancel = () => {
    this.props.history.push("/")
  }

  change = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state
    return (
      <Form
        submit={this.submit}
        elements={() => (
          <Fragment>
            <div class="bounds">
              <div class="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                  <div>
                    <input
                      onChange={this.change}
                      id="firstName"
                      name="firstName"
                      type="text"
                      class=""
                      placeholder="First Name"
                      value={firstName}
                    />
                  </div>
                  <div>
                    <input
                      onChange={this.change}
                      id="lastName"
                      name="lastName"
                      type="text"
                      class=""
                      placeholder="Last Name"
                      value={lastName}
                    />
                  </div>
                  <div>
                    <input
                      onChange={this.change}
                      id="emailAddress"
                      name="emailAddress"
                      type="text"
                      class=""
                      placeholder="Email Address"
                      value={emailAddress}
                    />
                  </div>
                  <div>
                    <input
                      onChange={this.change}
                      id="password"
                      name="password"
                      type="password"
                      class=""
                      placeholder="Password"
                      value={password}
                    />
                  </div>
                  <div>
                    <input
                      onChange={this.change}
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      class=""
                      placeholder="Confirm Password"
                      value={confirmPassword}
                    />
                  </div>
                </div>
                <div class="grid-100 pad-bottom">
                  <button class="button" type="submit">
                    Sign Up
                  </button>
                  <button class="button button-secondary" onClick={this.cancel}>
                    Cancel
                  </button>
                </div>
                <div>
                  <p>&nbsp;</p>
                  <p>
                    Already have a user account?
                    <a href="sign-in.html"> Click here</a> to sign in!
                  </p>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      />
    )
  }
}

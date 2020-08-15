import React, { Component, Fragment } from "react"
import Form from "./Form"

export default class UserSignUp extends Component {
  constructor(props) {
    super(props)
  }

  state = {}

  submit = (e) => {}

  cancel = () => {
    this.props.history.push("/")
  }

  change = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <Form
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
                      value=""
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
                      value=""
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
                      value=""
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
                      value=""
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
                      value=""
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

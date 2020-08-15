import React, { Component, Fragment } from "react"
import Form from "./Form"

export default class UserSignIn extends Component {
  constructor(props) {
    super(props)
  }

  state = {}

  submit = (e) => {}

  cancel = () => {
    this.props.history.goBack()
  }

  change = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <Form
        submit={this.submit}
        elements={() => (
          <Fragment>
            <div class="bounds">
              <div class="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                  <form>
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
                    <div class="grid-100 pad-bottom">
                      <button class="button" type="submit">
                        Sign In
                      </button>
                      <button
                        class="button button-secondary"
                        onClick={this.cancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>
                  Don't have a user account?
                  <a href="sign-up.html"> Click here</a> to sign up!
                </p>
              </div>
            </div>
          </Fragment>
        )}
      />
    )
  }
}

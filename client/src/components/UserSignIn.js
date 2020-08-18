import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import Form from "./Form"

export default class UserSignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailAddress: "",
      password: "",
      error: "",
    }
  }

  submit = () => {
    const { history, signIn } = this.props
    const { emailAddress, password } = this.state
    signIn(emailAddress, password)
      .then(() => {
        history.push("/")
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        })
      })
  }

  cancel = () => {
    this.props.history.goBack()
  }

  change = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { emailAddress, password, error } = this.state
    return (
      <Form
        submit={this.submit}
        elements={() => (
          <Fragment>
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <h3>{error}</h3>
                <div>
                  <div>
                    <input
                      onChange={this.change}
                      id="emailAddress"
                      name="emailAddress"
                      type="text"
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
                      placeholder="Password"
                      value={password}
                    />
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">
                      Sign In
                    </button>
                    <button
                      className="button button-secondary"
                      onClick={this.cancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <p>&nbsp;</p>
                <p>
                  Don't have a user account?
                  <Link to="/signup"> Click here</Link> to sign up!
                </p>
              </div>
            </div>
          </Fragment>
        )}
      />
    )
  }
}

import React, { Fragment, useState, useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import Form from "./Form"
import Context from "./provider"

export default function UserSignIn() {
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const history = useHistory()
  const { from } = history.location.state || { from: { pathname: "/" } }
  const {
    user,
    methods: { signIn },
  } = useContext(Context)

  function submit() {
    signIn(emailAddress, password)
      .then(() => {
        history.push(from)
      })
      .catch((error) => {
        if (error.message === "Failed to fetch") {
          setError("Check your internet connection and try again.")
        } else {
          // here you will redirect to an error page for server error
        }
      })
  }

  function cancel(e) {
    e.preventDefault()
    history.push("/")
  }

  return (
    <Form
      submit={submit}
      elements={() => (
        <Fragment>
          <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign In</h1>
              <h3 className="warning">{error}</h3>
              <div>
                <div>
                  <input
                    onChange={(e) => setEmailAddress(e.target.value)}
                    id="emailAddress"
                    name="emailAddress"
                    type="text"
                    placeholder="Email Address"
                    value={emailAddress}
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
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
                  <button className="button button-secondary" onClick={cancel}>
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

import React, { Fragment, useState, useContext } from "react"
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
    methods: { signIn },
  } = useContext(Context)

  /**
   * Attempt to authenticate the user, then redirect to home page or last visited page
   */
  function submit() {
    // display a message if the user leaves out email, password or both
    if (!emailAddress || !password) {
      if (!emailAddress && password) {
        setError("Please enter an email address.")
      } else if (!password && emailAddress) {
        setError("Please enter a password.")
      } else if (!password && !emailAddress) {
        setError("Please enter an email and a password.")
      }
      return
    }
    signIn(emailAddress, password)
      .then(() => {
        history.push(from)
      })
      .catch((error) => {
        if (error.message) {
          if (error.message === "Failed to fetch") {
            setError("Check your internet connection and try again.")
          } else {
            setError(error.message)
          }
        } else {
          history.push("/error")
        }
      })
  }

  /**
   * Cancel and go to home page
   * @param {Object} e - event
   */
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

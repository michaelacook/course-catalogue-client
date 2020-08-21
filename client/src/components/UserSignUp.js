import React, { Fragment, useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import Form from "./Form"
import Context from "./provider"

export default function UserSignUp() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState("")
  const [passwordsNotMatch, setPasswordsNotMatch] = useState(true)

  const history = useHistory()
  const { service } = useContext(Context)

  function submit() {
    if (password !== confirmPassword) {
      setPasswordsNotMatch(false)
      return null
    }
    service
      .signup({ firstName, lastName, emailAddress, password })
      .then(() => history.push("/signin"))
      .catch((errors) => {
        setErrors(errors)
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
              <h1>Sign Up</h1>
              <div>
                <div>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                  />
                </div>
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
                  {!passwordsNotMatch ? (
                    <span>Your password does not match.</span>
                  ) : null}
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                  />
                </div>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign Up
                </button>
                <button className="button button-secondary" onClick={cancel}>
                  Cancel
                </button>
              </div>
              <div>
                <p>&nbsp;</p>
                <p>
                  Already have a user account?
                  <Link to="/signin"> Click here</Link> to sign in!
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    />
  )
}

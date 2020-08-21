import React, { useState } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Cookies from "js-cookie"
import Header from "./Header"
import Courses from "./Courses"
import CreateCourse from "./CreateCourse"
import CourseDetail from "./CourseDetail"
import UpdateCourse from "./UpdateCourse"
import UserSignUp from "./UserSignUp"
import UserSignIn from "./UserSignIn"
import Service from "../lib/Service"
import UserSignOut from "./UserSignOut"
import PrivateRoute from "./PrivateRoute"
import { Provider } from "./provider"

export default function App() {
  const [user, setUser] = useState(Cookies.getJSON("user") || null)

  /**
   * Call Service.authenticate to send Authorization header and fetch user
   * On success, set global user state and persist user in a cookie
   * On fail, throw an error containing the error message
   * Caught error used to display to the user in the UserSignIn component
   * @param {String} emailAddress
   * @param {String} password
   */
  async function signIn(emailAddress, password) {
    try {
      const { authenticate } = Service
      const response = await authenticate(emailAddress, password)
      const { user } = response
      user.password = password
      Cookies.set("user", JSON.stringify(user), {
        expires: 28,
      })
      setUser(user)
    } catch (error) {
      throw new Error("Your email address or password is incorrect.")
    }
  }

  /**
   * End a user session by deleting auth cookie and setting user state to null
   * @return {Function} Redirect component
   */
  function signOut() {
    Cookies.remove("user")
    setUser(null)
    return <Redirect to="/signin" />
  }

  return (
    <Provider
      value={{
        service: Service,
        user,
        methods: {
          signIn,
          signOut,
        },
      }}
    >
      <BrowserRouter>
        <Route path="/" render={() => <Header user={user} />} />
        <Switch>
          <Route exact path="/" render={() => <Courses />} />
          <PrivateRoute exact path="/courses/create" user={user}>
            <CreateCourse />
          </PrivateRoute>

          <Route
            exact
            path="/courses/:id"
            render={({ match, history }) => <CourseDetail />}
          />
          <Route
            exact
            path="/signup"
            render={({ match, history }) => <UserSignUp />}
          />
          <Route
            exact
            path="/signin"
            render={({ match, history }) => (
              <UserSignIn match={match} history={history} signIn={signIn} />
            )}
          />
          <Route
            path="/courses/:id/update"
            render={({ match, history }) => <UpdateCourse />}
          />
          {/* This route causes a warning in the console: make sure to deal with it
          before submitting the project */}
          <Route
            exact
            path="/signout"
            render={() => <UserSignOut signOut={signOut} />}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

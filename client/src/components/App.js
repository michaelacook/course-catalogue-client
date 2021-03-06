import React, { useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
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
import ServerError from "./ServerError"
import NotFound from "./NotFound"
import { Provider } from "./provider"

export default function App() {
  const [user, setUser] = useState(Cookies.getJSON("user") || null)

  /**
   * Call Service.authenticate to send Authorization header and fetch user
   * On success, set global user state and persist user in a cookie
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
      if (error === "Access Denied.") {
        throw new Error("Your username or password is incorrect.")
      } else {
        throw error
      }
    }
  }

  /**
   * End a user session by deleting auth cookie and setting user state to null
   * @return {Function} Redirect component
   */
  function signOut() {
    Cookies.remove("user")
    setUser(null)
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
        <Route path="/" component={Header} />
        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute exact path="/courses/create" user={user}>
            <CreateCourse />
          </PrivateRoute>
          <Route exact path="/courses/:id" component={CourseDetail} />
          <Route exact path="/signup" component={UserSignUp} />
          <Route exact path="/signin" component={UserSignIn} />
          <PrivateRoute exact path="/courses/:id/update" user={user}>
            <UpdateCourse />
          </PrivateRoute>
          <Route
            exact
            path="/signout"
            render={() => <UserSignOut signOut={signOut} />}
          />
          <Route exact path="/error" component={ServerError} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

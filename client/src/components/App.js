import React, { Component } from "react"
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

export default class App extends Component {
  constructor(props) {
    super(props)
    this.signIn = this.signIn.bind(this)
    this.state = {
      service: Service,
      user: Cookies.getJSON("user") || null,
    }
  }

  /**
   * Call Service.authenticate to send Authorization header and fetch user
   * On success, set global user state and persist user in a cookie
   * On fail, throw an error containing the error message
   * Caught error used to display to the user in the UserSignIn component
   * @param {String} emailAddress
   * @param {String} password
   */
  async signIn(emailAddress, password) {
    try {
      const { authenticate } = this.state.service
      const response = await authenticate(emailAddress, password)
      const { user } = response
      user.password = password
      Cookies.set("user", JSON.stringify(user), {
        expires: 28,
      })
      this.setState({
        user: user,
      })
    } catch (error) {
      throw new Error("Your email address or password is incorrect.")
    }
  }

  /**
   * End a user session by deleting auth cookie and setting user state to null
   * @return {Function} Redirect component
   */
  signOut = () => {
    Cookies.remove("user")
    this.setState({
      user: null,
    })
    return <Redirect to="/signin" />
  }

  render() {
    const { service, user } = this.state
    return (
      <BrowserRouter>
        <Route path="/" render={() => <Header user={user} />} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Courses user={user} getCourses={service.getCourses} />
            )}
          />
          <Route exact path="/courses/create" component={CreateCourse} />
          <Route
            exact
            path="/courses/:id"
            render={({ match, history }) => (
              <CourseDetail
                match={match}
                history={history}
                getCourse={service.getCourse}
                deleteCourse={service.deleteCourse}
                user={user}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={({ match, history }) => (
              <UserSignUp
                match={match}
                history={history}
                signup={this.signUp}
              />
            )}
          />
          <Route
            exact
            path="/signin"
            render={({ match, history }) => (
              <UserSignIn
                match={match}
                history={history}
                signIn={this.signIn}
              />
            )}
          />
          <Route
            path="/courses/:id/update"
            render={({ match }) => (
              <UpdateCourse match={match} getCourse={service.getCourse} />
            )}
          />
          {/* This route causes a warning in the console: make sure to deal with it
          before submitting the project */}
          <Route
            exact
            path="/signout"
            render={() => <UserSignOut signOut={this.signOut} />}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

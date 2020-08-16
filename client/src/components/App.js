import React, { Component } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Header from "./Header"
import Courses from "./Courses"
import CreateCourse from "./CreateCourse"
import CourseDetail from "./CourseDetail"
import UpdateCourse from "./UpdateCourse"
import UserSignUp from "./UserSignUp"
import UserSignIn from "./UserSignIn"
import Service from "../lib/Service"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      service: Service,
      user: null,
    }
  }

  render() {
    const { service, user } = this.state
    return (
      <BrowserRouter>
        <Route path="/" component={Header} />
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
            render={({ match }) => (
              <CourseDetail match={match} getCourse={service.getCourse} />
            )}
          />
          <Route exact path="/signup" component={UserSignUp} />
          <Route exact path="/signin" component={UserSignIn} />
          <Route
            path="/courses/:id/update"
            render={({ match }) => (
              <UpdateCourse match={match} getCourse={service.getCourse} />
            )}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

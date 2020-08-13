import React, { Component } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import Header from "./Header"
import Courses from "./Courses"
import CourseDetail from "./CourseDetail"
import UpdateCourse from "./UpdateCourse"

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses/:id" component={CourseDetail} />
          <Route path="/courses/:id/update" component={UpdateCourse} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App

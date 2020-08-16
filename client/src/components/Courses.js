import React, { Component } from "react"
import { Link } from "react-router-dom"
import CourseButton from "./CourseButton"

export default class Courses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: "",
    }
  }

  componentDidMount() {
    this.props.getCourses().then((data) => {
      this.setState({
        courses: data.courses.rows,
      })
    })
  }

  render() {
    const { user } = this.props
    const courses = []
    const coursesState = this.state.courses
    for (let course of coursesState) {
      courses.push(
        <CourseButton title={course.title} id={course.id} key={course.id} />
      )
    }

    return (
      <div class="bounds">
        {courses}
        <div class="grid-33">
          {user ? (
            <Link
              class="course--module course--add--module"
              to="/courses/create"
            >
              <h3 class="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  class="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </h3>
            </Link>
          ) : null}
        </div>
      </div>
    )
  }
}

import React, { Component } from "react"
import CourseButton from "./CourseButton"

export default class Courses extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class="bounds">
        {/* test button */}
        <CourseButton title="Test Title" id="1" />
      </div>
    )
  }
}

import React from "react"
import { Link } from "react-router-dom"

const CourseDetail = (props) => {
  return (
    <div>
      <div class="actions--bar">
        <div class="bounds">
          <div class="grid-100">
            <span>
              <Link class="button" to="/courses/1/update">
                Update Course
              </Link>
              <Link class="button" to="">
                Delete Course
              </Link>
            </span>
            <Link class="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
      </div>
      <div class="bounds course--detail">
        <div class="grid-66">
          <div class="course--header">
            <h4 class="course--label">Course</h4>
            {/* course title from props */}
            <h3 class="course--title">Title Here</h3>
            <p>
              {/* course creator from props */}
              By
            </p>
          </div>
          <div class="course--description">
            {/* description of course from props */}
          </div>
        </div>
        <div class="grid-25 grid-right">
          <div class="course--stats">
            <ul class="course--stats--list">
              <li class="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{/* estimated time from props */}</h3>
              </li>
              <li class="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>{/* list of course materials from props */}</ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail

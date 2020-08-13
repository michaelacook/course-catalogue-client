import React from "react"
import { Link } from "react-router-dom"

const CourseButton = (props) => {
  const { title, id } = props
  return (
    <div class="grid-33">
      <Link class="course--module course--link" to={`/courses/${id}`}>
        <h4 class="course--label">Course</h4>
        <h3 class="course--title">{title}</h3>
      </Link>
    </div>
  )
}

export default CourseButton

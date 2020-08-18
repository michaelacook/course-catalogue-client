import React from "react"
import { Link } from "react-router-dom"

const CourseButton = (props) => {
  const { title, id } = props
  return (
    <div className="grid-33">
      <Link className="course--module course--link" to={`/courses/${id}`}>
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{title}</h3>
      </Link>
    </div>
  )
}

export default CourseButton

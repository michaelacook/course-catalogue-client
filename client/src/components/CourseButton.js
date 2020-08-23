import React from "react"
import { Link } from "react-router-dom"

/**
 * A reusable course button that renders a link to a course
 * @param {Object} props
 * @return {Function} component
 */
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

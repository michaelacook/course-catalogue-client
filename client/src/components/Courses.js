import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import Context from "./provider"
import CourseButton from "./CourseButton"

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [error, setError] = useState("")
  const { service } = useContext(Context)
  const { user } = useContext(Context)

  useEffect(() => {
    service
      .getCourses()
      .then((data) => {
        setCourses(data.courses.rows)
      })
      .catch((error) => {
        setError(
          "You may not be connected to the internet. Check your connection and try again."
        )
      })
  }, courses)

  const coursesList = []
  for (let course of courses) {
    coursesList.push(
      <CourseButton title={course.title} id={course.id} key={course.id} />
    )
  }

  return (
    <div className="bounds">
      {error ? (
        <div className="message">
          <h2>{error}</h2>
        </div>
      ) : null}
      {coursesList}
      <div className="grid-33">
        {user && !error ? (
          <Link
            className="course--module course--add--module"
            to="/courses/create"
          >
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
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

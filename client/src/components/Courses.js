import React, { useState, useEffect, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import Context from "./provider"
import CourseButton from "./CourseButton"

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [error, setError] = useState("")
  const { service } = useContext(Context)
  const { user } = useContext(Context)
  const history = useHistory()

  /**
   * Make a request to get an array of courses
   * Set state with courses
   */
  useEffect(() => {
    service
      .getCourses()
      .then((data) => {
        setCourses(data.courses.rows)
      })
      .catch((error) => {
        if (error.message) {
          if (error.message === "Failed to fetch") {
            setError("Check your internet connection and try again.")
          } else {
            history.push("/error")
          }
        } else {
          history.push("/error")
        }
      })
  }, [history, service])

  // populate an array of CourseButton components to be displayed
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
          <h2 className="warning">{error}</h2>
        </div>
      ) : null}
      {!courses.length && !error ? <h2>Loading...</h2> : coursesList}
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

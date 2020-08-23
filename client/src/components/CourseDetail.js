import React, { useState, useEffect, useContext } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import Context from "./provider"
import ReactMarkdown from "react-markdown"

export default function CourseDetail() {
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")
  const [materialsNeeded, setMaterialsNeeded] = useState("")
  const [error, setError] = useState("")

  const history = useHistory()
  const { id } = useParams()

  const { user, service } = useContext(Context)

  useEffect(() => {
    service
      .getCourse(id)
      .then((data) => {
        setTitle(data.course.title)
        setDescription(data.course.description)
        setEstimatedTime(data.course.estimatedTime)
        setMaterialsNeeded(data.course.materialsNeeded)
        setAuthor(data.course.author)
      })
      .catch((error) => {
        if (error.message) {
          if (error.message === "Failed to fetch") {
            setError("Check your internet connection and try again.")
          } else {
            history.push("/error")
          }
        }
      })
  }, [title, description, estimatedTime, materialsNeeded, history, id, service])

  function deleteCourse() {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const { email, password } = user
      service
        .deleteCourse(id, email, password)
        .then(() => {
          history.push("/")
        })
        .catch((error) => {
          if (error.message) {
            if (error.message === "Not authorized.") {
              setError(error.message)
            } else {
              history.push("/error")
            }
          } else {
            history.push("/error")
          }
        })
    }
  }

  return (
    <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <span>
              {user && user.id === author.id ? (
                <span>
                  <Link className="button" to={`/courses/${id}/update`}>
                    Update Course
                  </Link>
                  <button className="button" onClick={deleteCourse}>
                    Delete Course
                  </button>
                </span>
              ) : null}
            </span>
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
      </div>
      <div className="bounds course--detail">
        <h3 class="warning">{error}</h3>
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{title}</h3>
            <p>
              By {author.firstName} {author.lastName}
            </p>
          </div>
          <div className="course--description">
            <ReactMarkdown source={description} />
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ReactMarkdown source={materialsNeeded} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

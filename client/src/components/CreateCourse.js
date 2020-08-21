import React, { Fragment, useContext, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import Context from "./provider"
import Form from "./Form"

export default function CreateCourse() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")
  const [materialsNeeded, setMaterialsNeeded] = useState("")
  const [error, setError] = useState("")

  const history = useHistory()
  const { id } = useParams()

  const { user, service } = useContext(Context)

  /**
   * Add a course and then redirect the user to the course details page for the newly added course
   */
  function submit() {
    service
      .addCourse(
        {
          title,
          description,
          estimatedTime,
          materialsNeeded,
        },
        user.id,
        user.email,
        user.password
      )
      .then((id) => {
        history.push(`/courses/${id}`)
      })
      .catch((error) => {
        setError(error)
      })
  }

  function cancel(e) {
    // must prevent default because (probably event bubbling) causes the submit function to fire when you cancel
    e.preventDefault()
    history.goBack()
  }

  return (
    <Form
      submit={submit}
      elements={() => (
        <Fragment>
          <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      placeholder="Course title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Course description..."
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          placeholder="Hours"
                          value={estimatedTime}
                          onChange={(e) => setEstimatedTime(e.target.value)}
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          placeholder="List materials..."
                          value={materialsNeeded}
                          onChange={(e) => setMaterialsNeeded(e.target.value)}
                        ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Create Course
                </button>
                <button className="button button-secondary" onClick={cancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    />
  )
}

import React, { Fragment, useState, useContext, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import Context from "./provider"
import Form from "./Form"
import ValidationErrors from "./ValidationErrors"

export default function UpdateCourse() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")
  const [materialsNeeded, setMaterialsNeeded] = useState("")
  const [author, setAuthor] = useState("")
  const [errors, setErrors] = useState("")

  const { id } = useParams()
  const history = useHistory()

  const { user, service } = useContext(Context)

  function cancel(e) {
    e.preventDefault()
    history.goBack()
  }

  function submit() {
    service
      .updateCourse(
        {
          title,
          description,
          estimatedTime,
          materialsNeeded,
        },
        user.id,
        id,
        user.email,
        user.password
      )
      .then(() => {
        history.push(`/courses/${id}`)
      })
      .catch((error) => {
        setErrors(error)
      })
  }

  // only called once or else will be called each time the user changes a form field
  useEffect(() => {
    service.getCourse(id).then((data) => {
      setTitle(data.course.title)
      setDescription(data.course.description)
      setEstimatedTime(data.course.estimatedTime)
      setMaterialsNeeded(data.course.materialsNeeded)
      setAuthor(data.course.author)
    })
  }, [])

  return (
    <div>
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
            cancel={cancel}
            submit={submit}
            elements={() => (
              <Fragment>
                <div className="grid-66">
                  {errors ? <ValidationErrors errors={errors} /> : null}
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        id="title"
                        name="title"
                        type="text"
                        className="input-title course--title--input"
                        value={title}
                      />
                      {/* course creator name */}
                      <p>
                        By {author.firstName} {author.lastName}
                      </p>
                    </div>
                    <div className="course--description">
                      <div>
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                          id="description"
                          name="description"
                          className="course--description"
                          value={description}
                        ></textarea>
                      </div>
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
                            onChange={(e) => setEstimatedTime(e.target.value)}
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            className="course--time--input"
                            placeholder="Hours"
                            value={estimatedTime}
                          />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            onChange={(e) => setMaterialsNeeded(e.target.value)}
                            id="materialsNeeded"
                            name="materialsNeeded"
                            placeholder="List materials..."
                            value={materialsNeeded}
                          ></textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">
                    Update Course
                  </button>
                  <button className="button button-secondary" onClick={cancel}>
                    Cancel
                  </button>
                </div>
              </Fragment>
            )}
          />
        </div>
      </div>
    </div>
  )
}

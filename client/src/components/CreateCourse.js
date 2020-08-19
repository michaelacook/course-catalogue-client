import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import Form from "./Form"

export default class CreateCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
    }
  }

  /**
   * Add a course and then redirect the user to the course details page for the newly added course
   */
  submit = () => {
    const { addCourse, history, user } = this.props
    addCourse(this.state, user.id, user.email, user.password)
      .then((id) => {
        history.push(`/courses/${id}`)
      })
      .catch((error) => {
        this.setState({
          error: error,
        })
      })
  }

  change = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  cancel = () => {
    this.props.history.goBack()
  }

  render() {
    const { title, description, estimatedTime, materialsNeeded } = this.state
    return (
      <Form
        submit={this.submit}
        elements={() => (
          <Fragment>
            <div className="bounds course--detail">
              <h1>Create Course</h1>
              <div>
                {/* <div>
                  <h2 className="validation--errors--label">
                    Validation errors
                  </h2>
                  <div className="validation-errors">
                    <ul>
                      <li>Please provide a value for "Title"</li>
                      <li>Please provide a value for "Description"</li>
                    </ul>
                  </div>
                </div> */}
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
                        onChange={this.change}
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
                        onChange={this.change}
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
                            onChange={this.change}
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
                            onChange={this.change}
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
                  <button
                    className="button button-secondary"
                    onClick={this.cancel}
                  >
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
}

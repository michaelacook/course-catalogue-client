import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import Form from "./Form"

export default class UpdateCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  cancel = () => {
    this.props.history.goBack()
  }

  submit = () => {
    const { match, history, updateCourse, user } = this.props
    const id = match.params.id
    console.log(this.state)
    updateCourse(this.state, user.id, id, user.email, user.password)
      .then(() => {
        history.push(`/courses/${id}`)
      })
      .catch((error) => {
        this.setState({
          error: error,
        })
      })
  }

  componentDidMount() {
    const { match } = this.props
    const id = match.params.id
    this.props.getCourse(id).then((data) => {
      this.setState({
        title: data.course.title,
        description: data.course.description,
        estimatedTime: data.course.estimatedTime,
        materialsNeeded: data.course.materialsNeeded,
      })
    })
  }

  render() {
    const { title, description, estimatedTime, materialsNeeded } = this.state
    return (
      <div>
        <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            <Form
              cancel={this.cancel}
              submit={this.submit}
              elements={() => (
                <Fragment>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                        <input
                          onChange={this.handleChange}
                          id="title"
                          name="title"
                          type="text"
                          className="input-title course--title--input"
                          value={title}
                        />
                        {/* course creator name */}
                        <p>By</p>
                      </div>
                      <div className="course--description">
                        <div>
                          <textarea
                            onChange={this.handleChange}
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
                              onChange={this.handleChange}
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
                              onChange={this.handleChange}
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
                    <button
                      className="button button-secondary"
                      onClick={this.cancel}
                    >
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
}

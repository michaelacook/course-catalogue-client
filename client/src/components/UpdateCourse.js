import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import Form from "./Form"

class UpdateCourse extends Component {
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

  submit = () => {}

  componentDidMount() {
    const id = this.props.match.params.id
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
        <div class="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            <Form
              cancel={this.cancel}
              submit={this.submit}
              elements={() => (
                <Fragment>
                  <div class="grid-66">
                    <div class="course--header">
                      <h4 class="course--label">Course</h4>
                      <div>
                        <input
                          onChange={this.handleChange}
                          id="title"
                          name="title"
                          type="text"
                          class="input-title course--title--input"
                          value={title}
                        />
                        {/* course creator name */}
                        <p>By</p>
                      </div>
                      <div class="course--description">
                        <div>
                          <textarea
                            onChange={this.handleChange}
                            id="description"
                            name="description"
                            class="course--description"
                            value={description}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="grid-25 grid-right">
                    <div class="course--stats">
                      <ul class="course--stats--list">
                        <li class="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div>
                            <input
                              onChange={this.handleChange}
                              id="estimatedTime"
                              name="estimatedTime"
                              type="text"
                              class="course--time--input"
                              placeholder="Hours"
                              value={estimatedTime}
                            />
                          </div>
                        </li>
                        <li class="course--stats--list--item">
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
                  <div class="grid-100 pad-bottom">
                    <button class="button" type="submit">
                      Update Course
                    </button>
                    <button
                      class="button button-secondary"
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

export default UpdateCourse

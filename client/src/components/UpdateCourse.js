import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import Form from "./Form"

class UpdateCourse extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    })
  }

  cancel = () => {
    this.props.history.goBack()
  }

  submit = () => {}

  render() {
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
                          onChange={this.onChange}
                          id="title"
                          name="title"
                          type="text"
                          class="input-title course--title--input"
                          placeholder="Course title..."
                          // current title
                          value="Course Title"
                        />
                        {/* course creator name */}
                        <p>By</p>
                      </div>
                      <div class="course--description">
                        <div>
                          <textarea
                            onChange={this.onChange}
                            id="description"
                            name="description"
                            class=""
                            placeholder="Course description..."
                          >
                            {/* current course description */}
                          </textarea>
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
                              onChange={this.onChange}
                              id="estimatedTime"
                              name="estimatedTime"
                              type="text"
                              class="course--time--input"
                              placeholder="Hours"
                              // how many hours currently
                              value=""
                            />
                          </div>
                        </li>
                        <li class="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div>
                            <textarea
                              onChange={this.onChange}
                              id="materialsNeeded"
                              name="materialsNeeded"
                              class=""
                              placeholder="List materials..."
                            >
                              {/* materials needed */}
                            </textarea>
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

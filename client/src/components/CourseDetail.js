import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class CourseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
    }
  }

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

  delete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const { deleteCourse, history, match, user } = this.props
      const { email, password } = user
      const id = match.params.id
      deleteCourse(id, email, password)
        .then(() => {
          history.push("/")
        })
        .catch((error) => {
          this.setState({
            error: error.message,
          })
        })
    }
  }

  render() {
    const { title, description, estimatedTime, materialsNeeded } = this.state
    return (
      <div>
        <div class="actions--bar">
          <div class="bounds">
            <div class="grid-100">
              <span>
                <Link
                  class="button"
                  to={`/courses/${this.props.match.params.id}/update`}
                >
                  Update Course
                </Link>
                <button class="button" onClick={this.delete}>
                  Delete Course
                </button>
              </span>
              <Link class="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>
        </div>
        <div class="bounds course--detail">
          <div class="grid-66">
            <div class="course--header">
              <h4 class="course--label">Course</h4>
              {/* course title from props */}
              <h3 class="course--title">{title}</h3>
              <p>
                {/* course creator from props */}
                By
              </p>
            </div>
            <div class="course--description">
              <p>{description}</p>
            </div>
          </div>
          <div class="grid-25 grid-right">
            <div class="course--stats">
              <ul class="course--stats--list">
                <li class="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime}</h3>
                </li>
                <li class="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <pre>{materialsNeeded}</pre>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

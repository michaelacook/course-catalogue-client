import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class CourseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      author: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getCourse(id).then((data) => {
      this.setState({
        author: data.course.author,
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
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      author,
    } = this.state
    const { user } = this.props
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                {/* Don't show update and delete buttons unless the currently 
              authenticated user is the author (owner) of the course */}
                {author.id === user.id ? (
                  <span>
                    <Link
                      className="button"
                      to={`/courses/${this.props.match.params.id}/update`}
                    >
                      Update Course
                    </Link>
                    <button className="button" onClick={this.delete}>
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
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>
                By {author.firstName} {author.lastName}
              </p>
            </div>
            <div className="course--description">
              <p>{description}</p>
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

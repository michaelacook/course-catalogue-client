import React from "react"
import { Link } from "react-router-dom"

// Should probably be using the Form component here and passing it a React Fragment containing the inputs and textareas

const UpdateCourse = (props) => {
  return (
    <div>
      <div class="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form>
            <div class="grid-66">
              <div class="course--header">
                <h4 class="course--label">Course</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    class="input-title course--title--input"
                    placeholder="Course title..."
                    // current title
                    value="Course Title"
                  />
                </div>

                <p>By Joe Smith</p>
              </div>
              <div class="course--description">
                <div>
                  <textarea
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
            <div class="grid-25 grid-right">
              <div class="course--stats">
                <ul class="course--stats--list">
                  <li class="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
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
                onclick="event.preventDefault(); location.href='course-detail.html';"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateCourse

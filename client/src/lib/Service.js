/**
 * Class encapsulating static methods for interacting with the api
 * Implements the fetch API
 * Rationale for using static methods is that the class doesn't need to maintain
 * any of it's own data, just forms a client-side service layer
 * using static methods means no instance stored in memory
 */
export default class Service {
  /**
   * Base HTTP request method
   * @param {String} url - API endpoint
   * @param {Object} options - may contain HTTP verb, mode, cache, credentials, headers, body
   * @param {Object} credentials - username (email) and password for Basic auth
   * Headers must be an object
   * body must be a JSON string
   * @return {String} JSON stringified object
   */
  static async request(url, options, credentials = null) {
    if (credentials !== null) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`)
      options.headers['Authorization'] = `Basic ${encodedCredentials}`
    }
    const response = await fetch(url, options)
    if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors
      })
    }
    return response.json()
  }

  static async getCourses() {
    const courses = await Service.request("http://localhost:5000/api/courses", {
      method: "GET",
    })
    return courses
  }

  static async getCourse(id) {
    const course = await Service.request(
      `http://localhost:5000/api/courses/${id}`,
      {
        method: "GET",
      }
    )
    return course
  }

  static async addCourse() {}

  static async updateCourse() {}

  static async deleteCourse() {}

  static async signUp() {}

  static async signIn() {}
}

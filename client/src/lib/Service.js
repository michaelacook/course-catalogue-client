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
  static request(url, options, credentials = null) {
    if (credentials !== null) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      )
      options.headers["Authorization"] = `Basic ${encodedCredentials}`
    }
    return fetch(url, options)
  }

  /**
   * Send GET request for all courses in the database
   * @return {Object} data on response status 200
   */
  static async getCourses() {
    const response = await Service.request("http://localhost:5000/api/courses", {
      method: "GET",
    })
    if (response.status === 200) {
      return response.json().then(data => data)
    } else if (response.status === 400) {
      throw new Error()
    }
  }

  /**
   * Send GET request for a single course
   * @param {Number} id - PK id for course
   * @return {Object} data on response status 200
   */
  static async getCourse(id) {
    const response = await Service.request(
      `http://localhost:5000/api/courses/${id}`,
      {
        method: "GET",
      }
    )
    if (response.status === 200) {
      return response.json().then(data => data)
    } else if (response.status === 400) {
      throw new Error()
    }
  }

  static async addCourse() {}

  static async updateCourse() {}

  static async deleteCourse() {}

  /**
   * Send POST request to create user
   * @param {Object} body - should contain firstName, lastName, emailAddress, password
   * @return {Promise} on response status 201
   * @return {Array} data.errors on status 400 
   */
  static async signUp(body) {
    const response = await Service.request("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    if (response.status === 201) {
      return []
    } else if (response.status === 400) {
      const errors = await response.json().then(data => data.errors)
      return Promise.reject(errors)
    } else {
      throw new Error()
    }
  }

  static async signIn() {}
}

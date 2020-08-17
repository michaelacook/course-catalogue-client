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
   * @param {String} method - HTTP verb, default GET
   * @param {Object} body - HTTP payload, default null
   * @param {Object} credentials - username (email) and password for Basic auth, default null
   * Headers must be an object
   * body must be a JSON string
   * @return {String} JSON stringified object
   */
  static request(url, method = "GET", body = null, credentials = null) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    if (credentials) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
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
    const response = await Service.request("http://localhost:5000/api/courses")
    if (response.status === 200) {
      return response.json().then((data) => data)
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
      `http://localhost:5000/api/courses/${id}`
    )
    if (response.status === 200) {
      return response.json().then((data) => data)
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
    const response = await Service.request(
      "http://localhost:5000/api/users",
      "POST",
      body
    )
    if (response.status === 201) {
      return []
    } else if (response.status === 400) {
      const errors = await response.json().then((data) => data.errors)
      return Promise.reject(errors)
    } else {
      throw new Error()
    }
  }

  /**
   * Send GET request with Authorization header to authenticate with server
   * @param {String} emailAddress
   * @param {String} password
   * @return {Object} user on response status 200
   * @return {Promise} error on response status 401
   */
  static async authenticate(emailAddress, password) {
    const response = await Service.request(
      "http://localhost:5000/api/users",
      "GET",
      null,
      { emailAddress, password }
    )
    if (response.status === 200) {
      const user = await response.json().then((data) => data)
      return user
    } else if (response.status === 401) {
      const error = await response.json().then((data) => data.message)
      return Promise.reject(error)
    }
  }
}

const ServerError = new Error()

ServerError.name = "ServerError"
ServerError.message = "There was an unexpected error. Please try again later."

export default ServerError

/*
ServerError is used for whenever a Service method encounters an error 
such a status 500 level response that it otherwise has no way of handling 
The client receives the ServerError and renders an Error component 
*/

const ServerError = new Error()

ServerError.name = "ServerError"
ServerError.message = "There was an unexpected error. Please try again later."

export default ServerError

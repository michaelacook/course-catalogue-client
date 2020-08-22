// get protocol, hostname and port and export a base url string 

const { protocol, hostname } = window.location
const baseURL = `${protocol}//${hostname}:5000`

export default baseURL
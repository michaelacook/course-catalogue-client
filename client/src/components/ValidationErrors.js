import React from "react"

/**
 * Display a set of validation errors
 * Destructures props to get an errors array
 */
export default ({ errors }) => {
  const list = []
  for (let error of errors) {
    list.push(<li>{error}</li>)
  }
  return (
    <div>
      <h2 className="validation--errors--label">Validation errors</h2>
      <div className="validation-errors">
        <ul>{list}</ul>
      </div>
    </div>
  )
}

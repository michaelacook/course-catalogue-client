import React from "react"

/**
 * Reusable vaidation errors component
 * Display a set of validation errors passes as props
 * Destructures props to get an errors array
 */
export default ({ errors }) => {
  const list = []
  for (let i = 0; i < errors.length; i++) {
    list.push(<li key={i}>{errors[i]}</li>)
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

import React from "react"

/**
 * Render a simple 500 error page
 */
export default () => {
  return (
    <div className="bounds">
      <div className="grid-66">
        <div>
          <h1>Error</h1>
          <p>There was an unexpected error. Please try again later.</p>
        </div>
      </div>
    </div>
  )
}

import React from "react"

/**
 * A reusable form component that renders as many elements
 * passed to it in a function elements()
 * Provides a handleSubmit function to handle preventing default
 * browser submitting, then calls a submit function passes as props
 * @param {Object} props
 * @return {Function} form component
 */
export default function Form(props) {
  function handleSubmit(e) {
    e.preventDefault()
    props.submit()
  }

  return <form onSubmit={handleSubmit}>{props.elements()}</form>
}

import React, { useEffect } from "react"
import { Redirect } from "react-router-dom"

export default ({ signOut }) => {
  useEffect(() => {
    signOut()
  }, [signOut])

  return <Redirect to="/signin" />
}

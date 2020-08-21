import React from "react"
import { Route, Redirect } from "react-router-dom"

export default ({ user, children, componentProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location.pathname },
            }}
          />
        )
      }
    />
  )
}

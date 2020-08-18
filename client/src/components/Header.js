import React from "react"
import { NavLink } from "react-router-dom"

const Header = ({ user }) => {
  return (
    <div className="header">
      <div className="bounds">
        <NavLink to="/">
          <h1 className="header--logo">Courses</h1>
        </NavLink>
        <nav>
          {user ? (
            <div>
              <span>Welcome, {user.firstName}!</span>
              <NavLink to="/signout">Sign Out</NavLink>
            </div>
          ) : (
            <div>
              <NavLink className="signup" to="/signup">
                Sign Up
              </NavLink>
              <NavLink className="signin" to="/signin">
                Sign In
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Header

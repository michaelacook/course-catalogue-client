import React from "react"
import { NavLink } from "react-router-dom"

const Header = ({ user }) => {
  return (
    <div class="header">
      <div class="bounds">
        <NavLink to="/">
          <h1 class="header--logo">Courses</h1>
        </NavLink>
        <nav>
          {user ? (
            <div>
            <span>Welcome, {user.firstName}!</span>
            <NavLink to="/signout">
              Sign Out
            </NavLink>
            </div>
          ) : (
            <div>
              <NavLink class="signup" to="/signup">
                Sign Up
              </NavLink>
              <NavLink class="signin" to="/signin">
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

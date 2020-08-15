import React from "react"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <div class="header">
      <div class="bounds">
        <NavLink to="/">
          <h1 class="header--logo">Courses</h1>
        </NavLink>
        <nav>
          <NavLink class="signup" to="/signup">
            Sign Up
          </NavLink>
          <NavLink class="signin" to="/signin">
            Sign In
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Header

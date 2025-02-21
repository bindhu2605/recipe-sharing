import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const LogoutUser = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isAuthenticated"); // Remove authentication flag
      localStorage.removeItem("currentUser"); // Remove current user data
      window.location.href = "/login";
    } else {
      window.location.href = "/recipes";
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleMenu = () => {
    setIsOpen(false);
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div>
      <nav>
        <div className="nav-left">
          <FontAwesomeIcon
            icon={faBars}
            className="hamburger-icon"
            onClick={toggleMenu}
            style={isOpen ? { transform: "rotate(90deg)" } : {}}
          />

          <h2>Recipe Sharing App</h2>
        </div>
        <div className={`nav-right ${isOpen ? "open" : ""}`}>
          <ul>
            {isAuthenticated ? (
              <>
                <li>
                  <NavLink to="/recipes" onClick={handleToggleMenu}>
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/addRecipe" onClick={handleToggleMenu}>
                    Add Recipe
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/favouriteRecipes" onClick={handleToggleMenu}>
                    Favourites
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={LogoutUser}>
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" onClick={handleToggleMenu}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" onClick={handleToggleMenu}>
                    SignUp
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/forgotPassword" onClick={handleToggleMenu}>
                    Forgot Password
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
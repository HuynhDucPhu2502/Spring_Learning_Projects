import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto flex space-x-4 p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-gray-300 ${isActive ? "font-bold" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `hover:text-gray-300 ${isActive ? "font-bold" : ""}`
          }
        >
          Users
        </NavLink>
      </nav>
    </header>
  );
}

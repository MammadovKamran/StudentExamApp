/** @format */

import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 mb-6">
      <ul className="flex space-x-4">
        <li>
          <Link to="/lessons" className="hover:underline">
            Lessons
          </Link>
        </li>
        <li>
          <Link to="/students" className="hover:underline">
            Students
          </Link>
        </li>
        <li>
          <Link to="/exams" className="hover:underline">
            Exams
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

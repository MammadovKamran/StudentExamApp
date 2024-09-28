/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import LessonsPage from "./pages/Lessons";
import StudentsPage from "./pages/Students";
import ExamsPage from "./pages/Exam";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/lessons" />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/exams" element={<ExamsPage />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import About from "./pages/About";
import AddStudent from "./pages/AddStudent";
import UpdateStudent from "./pages/UpdateStuent";
import Students from "./pages/Students";
export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/update" element={<UpdateStudent />} />
        <Route path="/update/:id" element={<UpdateStudent />} />
        <Route path="/show" element={<Students />} />
      </Routes>
    </div>
  );
}

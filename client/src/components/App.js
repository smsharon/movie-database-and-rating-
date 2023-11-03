import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import AddMovie from './AddMovie';
import Navbar from './Navbar';

function App() {
  return (
    <div className="app">
      
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/addMovie" element={<AddMovie />} />
        </Routes>
      </Router> 
      
    </div>
  );
}

export default App;

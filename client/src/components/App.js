import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";

function App() {
  return (
    <div className="app">
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movie />} />
        </Routes>
      </Router> 
      
    </div>
  );
}

export default App;

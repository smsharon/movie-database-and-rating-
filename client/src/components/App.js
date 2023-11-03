import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import LoginSignup from "./LoginSignup"

function App() {
  return (
    <div className="app">
            
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;

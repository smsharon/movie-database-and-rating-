import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import Login from "./Login";
import Registration from "./Registration";
import AddMovie from './AddMovie';
import Navbar from './Navbar';


function App() {
  return (
    <div className="app">
            
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/addMovie" element={<AddMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;

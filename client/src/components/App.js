import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import AddMovie from './AddMovie';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';


function App() {
  return (
    <div className="app">
      
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/addMovie" element={<AddMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router> 
      
    </div>
  );
}

export default App;

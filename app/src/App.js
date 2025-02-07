import './App.css';
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Nav from './components/Nav';
import {Context} from './index';
import axios from "axios";
import Footer from './components/Footer';


function App() {
   
  const { isAuthenticated, setIsAuthenticated, setUser } =
  useContext(Context);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/user/me",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
    }
  };
  fetchUser();
}, [isAuthenticated]);


  return (
    <>
   <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer/>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './page/Dashboard';
import Doctors from './page/Doctors';
import Login from './page/Login';
import Messages from './page/Messages';
import Sidebar from './page/Sidebar';
import AddNewDoctor from './page/AddNewDoctor';
import AddNewAdmin from './page/AddNewAdmin';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import React, { useContext, useEffect } from "react";
import { Context } from "./index";
import './App.css'

const App = () => {

  const { isAuthenticated, setIsAuthenticated, setAdmin } =
    useContext(Context);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get("http://localhost:4000/user/AUsers", {
            withCredentials: true,
          });
          setIsAuthenticated(true);
          setAdmin(response.data.user);
        } catch (error) {
          setIsAuthenticated(false);
          setAdmin({});
        }
      };
      fetchUser();
    }, [isAuthenticated]); 

    return (
    <Router>
    <Sidebar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/doctor/addnew" element={<AddNewDoctor />} />
      <Route path="/admin/addnew" element={<AddNewAdmin />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/doctors" element={<Doctors />} />
    </Routes>
    <ToastContainer position="top-center" />
  </Router>
  )
}

export default App
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate, Link} from "react-router-dom";

import { Button } from 'react-bootstrap';

import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';
import { useState, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) =>{
    setIsAuthenticated(boolean)
  }

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        methods: "GET",
        headers: {token: localStorage.token}
      });     

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }

  }


  useEffect( () =>{
    console.log("entro al effect")
    isAuth();
  }, [])

  return (
    <>
      <Router>
        <header>
          <div style={{display:"flex", justifycontent:"center"}} className='container'>
            <Link to="/login">
              <Button>Ruta Login</Button>
            </Link>
            <Link to="/register">
              <Button>Ruta Registro</Button>
            </Link>
            <br/>
            <Link to="/dashboard">
              <Button>Ruta Dashboard</Button>
            </Link>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate to="/dashboard"/>)} />
          <Route path="/register" element={!isAuthenticated ? (<Register setAuth={setAuth}/>) : (<Navigate to="/login"/>)} />
          <Route path="/dashboard" element={isAuthenticated ? (<Dashboard setAuth={setAuth} />) : (<Navigate to="/login"/>)} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;

import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate, Link} from "react-router-dom";

import { Button } from 'react-bootstrap';

import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';
import TerminarRegistro from './routes/TerminarRegistro';
import { useState, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isComplete, setIsComplete] = useState(false)

  const setAuth = (boolean) =>{
    setIsAuthenticated(boolean)
  }

  const setComplete = (boolean) =>{
    setIsComplete(boolean)
  }

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token}
      });     

      const parseRes = await response.json();
      if (parseRes.verify === true){
        setIsAuthenticated(true);
        setIsComplete(parseRes.is_Complete);
      }else{
        setIsAuthenticated(false);
      }
      
    } catch (err) {
      console.error(err.message);
    }

  }


  useEffect( () =>{
    isAuth();
  }, [isAuthenticated])

  return (
    <>
      <Router>
        <header>
          <div style={{display:"flex", justifyContent:"center"}} className='container'>
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
          {/* El usuario puede entrar a la ruta login siempre y cuando NO este autenticado,
          - si esta autenticado e intenta ir a la ruta login, este sera redirigido a su dashboard */}
          <Route path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate to={isComplete ? "/dashboard" : "/terminarRegistro"} />)} />

          {/* El usuario puede entrar a la ruta registro siempre y cuando NO este autenticado,
          - si esta autenticado e intenta ir a la ruta registro, este sera redirigido a la ruta login y luego al dashboard */}
          <Route path="/register" element={!isAuthenticated ? (<Register setAuth={setAuth}/>) : (<Navigate to={isComplete ? "/dashboard" : "/terminarRegistro"}/>)} />

          {/* El usuario puede entrar a la ruta dashboard siempre y cuando SI este autenticado y SI haya completado su registro,
          - si no esta autorizado e intenta ir a la ruta dashboard, sera redirigido a la ruta login
          - si el usuario intenta ir a la ruta dashboard pero No esta completo su registro, sera redirigido a completar su registro*/}
          <Route path="/dashboard" element={isAuthenticated ? 
            ((isComplete ? (<Dashboard setAuth={setAuth} setComplete={setComplete} />): (<Navigate to="/terminarRegistro"/>))
            ): (<Navigate to="/login"/>)} />

          {/* El usuario puede entrar a la ruta terminarRegistro siempre y cuando SI este autenticado y NO haya completado su registro,
          - si no esta autorizado e intenta ir a la ruta terminarRegistro, sera redirigido a la ruta login
          - si el usuario intenta ir a la ruta terminarRegistro pero SI esta completo su registro, sera redirigido a su dashboard
          - si el usuario intenta ir a la ruta terminarRegistro pero no esta completado, el usuario podra completar su registro*/}
          <Route path="/terminarRegistro" element={isAuthenticated ?
             (isComplete ? <Dashboard setAuth={setAuth} setComplete={setComplete} /> : (<TerminarRegistro setAuth={setAuth} setComplete={setComplete}/>)
             ): (<Navigate to="/login"/>)} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TerminarRegistro({ setAuth, setComplete }) {
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    edad: '',
    genero: '',
    fechaNacimiento: '',
    universidad: '',
    carrera: ''
  });

  const { nombre, apellidoP, apellidoM, genero, fechaNacimiento, universidad, carrera } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    setComplete(false);
    toast.success('Logged out successfully!');
  };
  // metodo con warning y ampliada
  // useEffect(() => {
  //   const updateProgress = () => {
  //     let filledFields = 0;
  //     if (nombre) filledFields += 1;
  //     if (apellidoP) filledFields += 1;
  //     if (apellidoM) filledFields += 1;
  //     if (fechaNacimiento) filledFields += 1;
  //     if (genero) filledFields += 1;
  //     if (universidad) filledFields += 1;
  //     if (carrera) filledFields += 1;
  
  //     setProgress((filledFields / 7) * 100); // Calcula el porcentaje según los 7 campos
  //   };
  //   updateProgress();
  // }, [inputs]);

  // metodo simplificado y sin warning
  useEffect(() => {
    let filledFields = 0;
    Object.values(inputs).forEach((field) => {
      if (field) filledFields += 1;
    });
  
    setProgress((filledFields / 7) * 100);
  }, [inputs]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { nombre, apellidoP, apellidoM, genero, fechaNacimiento, universidad, carrera };

      const response = await fetch("http://localhost:5000/completeRegister", {
        method: "PUT", // Cambiar a PUT para que coincida con el servidor
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();
      if (parseRes === true){
        setComplete(true);
        toast.success("Registered successfully!");
      }else{
        toast.error("Debes completartodos los campos");
      }


    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <>
      <div style={{ paddingLeft: '20%', paddingRight: '20%', marginTop: '2%', marginBottom: '2%' }}>
        <ProgressBar now={progress} />
      </div>
      <form onSubmit={onSubmitForm}>
        <div className="d-flex justify-content-center">
          <div className="w-75">
            <Accordion defaultActiveKey={['']} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Informacion personal</Accordion.Header>
                <Accordion.Body>
                  {/* Formulario con clases Bootstrap */}
                  <div className="row g-3">
                    <div className="col-12 col-md-4">
                      <input className="form-control" value={nombre} onChange={onChange} type="text" name="nombre" placeholder="Nombre" />
                    </div>
                    <div className="col-12 col-md-4">
                      <input className="form-control" value={apellidoP} onChange={onChange} type="text" name="apellidoP" placeholder="Apellido Paterno" />
                    </div>
                    <div className="col-12 col-md-4">
                      <input className="form-control" value={apellidoM} onChange={onChange} type="text" name="apellidoM" placeholder="Apellido Materno" />
                    </div>
                  </div>
                  <div className="row g-3 mt-3 align-items-center">
                    <div className="col-md-4">
                      <label htmlFor="fechaNacimiento" className="form-label me-2">Fecha de nacimiento:</label>
                      <input className="form-control d-inline-block w-auto" value={fechaNacimiento} onChange={onChange} type="date" name="fechaNacimiento" id="fechaNacimiento" />
                    </div>
                    <div className="col-md-4 d-flex align-items-center">
                      <label htmlFor="genero" className="form-label me-2">Género:</label>
                      <select className="form-select ms-2" name="genero" value={genero} onChange={onChange}>
                        <option value="">Seleccionar</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div className="row g-3 mt-3">
                    <div className="col-12 col-md-4">
                      <input className="form-control" value={universidad} onChange={onChange} type="text" name="universidad" placeholder="Universidad" />
                    </div>
                    <div className="col-12 col-md-4">
                      <input className="form-control" value={carrera} onChange={onChange} type="text" name="carrera" placeholder="Carrera" />
                    </div>
                  </div>

                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <button className='btn btn-success btn-block' >Submit</button>
          </div>
        </div>
        <button className="btn btn-primary mt-3" onClick={(e) => logout(e)}>
          Logout
        </button>
      </form>
    </>
  );
}

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
    bDate: '',
    universidad: "",
    carrera: ""
  });

  const { nombre, apellidoP, apellidoM, edad, genero, bDate, universidad, carrera } = inputs;

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

  const updateProgress = () => {
    let filledFields = 0;
    if (nombre) filledFields += 1;
    if (apellidoP) filledFields += 1;
    if (apellidoM) filledFields += 1;
    if (bDate) filledFields += 1;
    
    setProgress(filledFields * 25);
  };

  useEffect(() => {
    updateProgress();
  }, [inputs]);

  useEffect(() => {
    setInputs({ ...inputs, edad: calcularEdad(bDate)});
    console.log("edad ",edad)
  },[bDate])

  {/* bton de prueba */}
  function mostrar(){
    console.log(nombre)
    console.log(apellidoP)
    console.log(apellidoM)
    console.log(bDate)
    console.log(edad)
    console.log(universidad)
    console.log(carrera)
    console.log(genero)
  }

  function calcularEdad(fechaNacimiento) {
    const [anio, mes, dia] = fechaNacimiento.split('-');
    const fechaNac = new Date(anio, mes - 1, dia);
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
    if (mesActual < (mes - 1) || (mesActual === (mes - 1) && diaActual < dia)) {
      edad--;
    }
    return edad;
  }

  
  return (
    <>
      <div style={{ paddingLeft: '20%', paddingRight: '20%', marginTop: '2%', marginBottom: '2%' }}>
        <ProgressBar now={progress} />
      </div>

      <div className="d-flex justify-content-center">
        <div className="w-75">
          <Accordion defaultActiveKey={['']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Informacion personal</Accordion.Header>
              <Accordion.Body>
                {/* Formulario con clases Bootstrap */}
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <input className="form-control" value={nombre} onChange={onChange} type="text" name="nombre" placeholder="Nombre"/>
                  </div>
                  <div className="col-12 col-md-4">
                    <input className="form-control" value={apellidoP} onChange={onChange} type="text" name="apellidoP" placeholder="Apellido Paterno"/>
                  </div>
                  <div className="col-12 col-md-4">
                    <input className="form-control" value={apellidoM} onChange={onChange} type="text" name="apellidoM" placeholder="Apellido Materno"/>
                  </div>
                </div>
                <div className="row g-3 mt-3 align-items-center">
                  <div className="col-md-4">
                    <label htmlFor="bDate" className="form-label me-2">Fecha de nacimiento:</label>
                    <input className="form-control d-inline-block w-auto" value={bDate} onChange={onChange} type="date" name="bDate" id="bDate"/>
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
                    <input className="form-control" value={universidad} onChange={onChange} type="text" name="universidad" placeholder="universidad"/>
                  </div>
                  <div className="col-12 col-md-4">
                    <input className="form-control" value={carrera} onChange={onChange} type="text" name="carrera" placeholder="carrera"/>
                  </div>
                  <div className="col-12 col-md-4">
                    <input className="form-control" value={apellidoM} onChange={onChange} type="text" name="apellidoM" placeholder="Apellido Materno"/>
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
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={(e) => logout(e)}>
        Logout
      </button>
      <button onClick={mostrar}></button>
    </>
  );
}

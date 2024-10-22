import React from 'react'
import { useState } from 'react'
import { toast } from "react-toastify";

export default function Register({setAuth}) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const {email, password, name} = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {email, password, name}

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      //respuesta esperada: {token: eltoken}
      const parseRes = await response.json();

      if (parseRes.token){
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registed successfully!");
      } else{
        setAuth(false);
        toast.error(parseRes)
      }
      
    } catch (err) {
      console.error(err.message)
    }

  };

  return (
    <>
        <h1 className='text-center my-5' >Register</h1>
        <div className='container'>
          <div className="col-md-6 offset-md-3">
            <form onSubmit={onSubmitForm}>
              <input className='form-control my-3' value={email} onChange={onChange} type="email" name="email" placeholder='email' />
              <input className='form-control my-3' value={password} onChange={onChange} type="password" name="password" placeholder='password' />
              <input className='form-control my-3' value={name} onChange={onChange} type="text" name="name" placeholder='name' />
              <button className='btn btn-success btn-block' >Submit</button>
            </form>
          </div>
        </div>
    </>
  )
}

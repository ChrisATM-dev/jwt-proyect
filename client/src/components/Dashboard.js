import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Dashboard({setAuth}) {
  const [name, setName] = useState("");

  const getName = async () =>{
    try {
      const response = await fetch("http://localhost:5000/dashboard" , {
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json();
      setName(parseRes.user_name)

      
    } catch (err) {
      console.error(err.message)
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false)
    toast.success("Logged out successfully!")
  }
  useEffect(() => {
    getName();

  },[])


  return (
    <>
        <h1>Dashboard {name}</h1>
        <button className='btn btn-primary' onClick={e => logout(e)}>Logout</button>
    </>
  )
}

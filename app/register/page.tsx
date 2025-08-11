'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const router = useRouter();

  const handlesubmit= async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(password!=confirmpassword)
    {
      alert("passwords dont match");
      return;
    }

    try {
      const res = await fetch("api/auth/register",{
        method: "POST",
        headers:{
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        }),
      })
      const data = await res.json();

      if(!res.ok)
      {
        throw new Error(data.error || "Registration failed");
      }

      console.log("Registration successful", data);
      router.push("/login");
    } catch (error) {
      alert("Registration failed: " + error);
      console.error("Registration error:", error);
    }
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handlesubmit}>
      
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input 
            type="password" 
            id="confirmpassword" 
            value={confirmpassword} 
            onChange={(e) => setconfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  )
}

export default RegisterPage
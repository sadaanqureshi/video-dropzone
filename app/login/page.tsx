'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Loginpage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        });
        if (res?.error) {
            alert("Login failed: " + res.error);
            console.error("Login error:", res.error);
        } else {
            console.log("Login successful");
            router.push("/");
        }
    }

    return (

        <div>
            <h1>Login</h1>
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
                <button type="submit">Login</button>
            </form>
            <div>
                <button onClick={() => signIn("google")}>Sign in with google</button>
            </div>
            <div>
                <p>Dont have an account?</p>
                <button onClick={()=> router.push("/register")}>Register</button>
            </div>
        </div>

    )
}
export default Loginpage
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (result.token) {
        setToken(result.token);
        navigate("/account");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

    return (
        <div className="login-container">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Email:
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            </label>
            <label>
            Password:
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            </label>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}
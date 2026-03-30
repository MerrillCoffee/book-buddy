import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          firstname: firstName, 
          lastname: lastName, 
          email, 
          password 
        }),
      });
      const result = await response.json();

      if (result.token) {
        setToken(result.token);
        navigate("/account");
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name: 
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <label>Last Name: 
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <label>Email: 
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Password: 
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Books from "./books/Books"; 
import SingleBook from "./books/SingleBook";
import Login from "./login/Login";
import Register from "./register/Register";
import Account from "./account/Account";

export default function App() {
  const [token, setToken] = useState(null);

  return(
  <>
    <BrowserRouter>
      <nav>
        <h1>
          <img id="logo-image" src="/books.png" alt="logo" />
          Book Buddy
        </h1>
        <Link typeof="button" to="/">Library</Link>
        <Link typeof="button" to="/account">Account</Link>
        {!token ?(
          <Link typeof="button" to="/login">Log In</Link>
        ) : (
          <button onClick={() => setToken(null)}>Log Out</button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/account" element={<Account token={token} />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

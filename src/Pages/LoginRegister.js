import { useState, useEffect } from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import "./../Style/Login.css";

const LoginRegister = () => {
    let[email,setEmail] = useState("");
    let[password,setPassword] = useState("");
    let[mode, setMode] = useState("login"); // "login" or "register"
    const { setIsLoggedIn } = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from || "/home";

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (mode === "login") {
            if(email === "abc@gmail.com" && password === "a123"){
                const userData = { email, loginTime: new Date().toISOString() };
                localStorage.setItem("auth", "true");
                localStorage.setItem("userData", JSON.stringify(userData));
                setIsLoggedIn(true);
                navigate(from, { replace: true });
            } else {
                alert("Invalid credentials");
            }
        } else {
            // Register: store user data
            const userData = { email, loginTime: new Date().toISOString() };
            localStorage.setItem("auth", "true");
            localStorage.setItem("userData", JSON.stringify(userData));
            setIsLoggedIn(true);
            navigate(from, { replace: true });
        }
    };

    const toggleMode = () => {
        setMode(mode === "login" ? "register" : "login");
    };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>{mode === "login" ? "Login Page" : "Register Page"}</h2>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Email"
        ></input>
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Password"
        ></input>
        <button className="loginButton" type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>
        <button type="button" onClick={toggleMode}>
          {mode === "login" ? "Create New Account" : "Already have an account? Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginRegister;
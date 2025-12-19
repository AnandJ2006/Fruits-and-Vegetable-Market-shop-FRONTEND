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
            const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
            const userStatuses = JSON.parse(localStorage.getItem("userStatuses") || "{}");
            const user = users.find(u => u.email === email && u.password === password);
            
            if(user || (email === "abc@gmail.com" && password === "a123") || (email === "admin@gmail.com" && password === "admin123")){
                // Check if user is blocked
                const userStatus = userStatuses[email] || "active";
                if (userStatus === "blocked" && email !== "admin@gmail.com") {
                    alert("Your account has been blocked. Please contact admin.");
                    return;
                }
                
                const userData = { email, loginTime: new Date().toISOString() };
                localStorage.setItem("auth", "true");
                localStorage.setItem("userData", JSON.stringify(userData));
                setIsLoggedIn(true);
                navigate(from, { replace: true });
            } else {
                alert("Invalid credentials");
            }
        } else {
            const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
            const existingUser = users.find(u => u.email === email);
            
            if(existingUser) {
                alert("Email already registered");
                return;
            }
            
            users.push({ email, password });
            localStorage.setItem("registeredUsers", JSON.stringify(users));
            
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
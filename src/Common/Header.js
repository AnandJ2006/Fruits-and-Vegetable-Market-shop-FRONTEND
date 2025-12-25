import { NavLink } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const handleLogout = () => {
        localStorage.removeItem("auth");
        setIsLoggedIn(false);
    };

    return (
        <header className="header">
            <img src = "./image/logo192.png" alt = "Black"></img>
            <div className = "links">
                <NavLink to = {"/home"}> Home </NavLink>
                <NavLink to = {"/cart"}> Cart </NavLink>
                <NavLink to = {"/profile"}> Profile </NavLink>
                <NavLink to = {"/search"}> Search </NavLink>
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <NavLink to = {"/login"}> Login </NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;

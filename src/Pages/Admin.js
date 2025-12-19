import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LoginPrompt from "../Common/LoginPrompt";
import "../Style/Admin.css";

const Admin = () => {
  const { isLoggedIn } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      setCurrentUser(userData);
      loadUsers();
    }
  }, [isLoggedIn]);

  const loadUsers = () => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const userStatuses = JSON.parse(localStorage.getItem("userStatuses") || "{}");
    
    const usersWithStatus = registeredUsers.map(user => ({
      ...user,
      status: userStatuses[user.email] || "active"
    }));
    
    setUsers(usersWithStatus);
  };

  const deleteUser = (email) => {
    if (window.confirm(`Are you sure you want to delete user: ${email}?`)) {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const updatedUsers = registeredUsers.filter(user => user.email !== email);
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      
      // Remove user profile
      localStorage.removeItem(`profile_${email}`);
      
      loadUsers();
      alert("User deleted successfully");
    }
  };

  const toggleUserStatus = (email) => {
    const userStatuses = JSON.parse(localStorage.getItem("userStatuses") || "{}");
    const currentStatus = userStatuses[email] || "active";
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    
    userStatuses[email] = newStatus;
    localStorage.setItem("userStatuses", JSON.stringify(userStatuses));
    
    loadUsers();
    alert(`User ${newStatus === "blocked" ? "blocked" : "unblocked"} successfully`);
  };

  if (!isLoggedIn) {
    return <LoginPrompt pageName="Admin" />;
  }

  // Check if current user is admin
  if (currentUser?.email !== "admin@gmail.com") {
    return (
      <div className="admin-container">
        <h1>Access Denied</h1>
        <p>Only admin users can access this page.</p>
        <p>Please login with admin credentials.</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Admin Panel - User Management</h1>
      
      <div className="users-grid">
        {users.length === 0 ? (
          <p>No registered users found.</p>
        ) : (
          users.map((user, index) => (
            <div key={index} className="user-card">
              <h3>{user.email}</h3>
              <p><strong>Status:</strong> 
                <span className={`status ${user.status}`}>
                  {user.status.toUpperCase()}
                </span>
              </p>
              <div className="user-actions">
                <button 
                  className={user.status === "active" ? "block-btn" : "unblock-btn"}
                  onClick={() => toggleUserStatus(user.email)}
                >
                  {user.status === "active" ? "Block User" : "Unblock User"}
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => deleteUser(user.email)}
                >
                  Delete User
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminStyle/User.css";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        const nonAdminUsers = data.filter((user) => user.admin === "false");
        setUsers(nonAdminUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="user-list-container">
      <h1 className="user-list-heading">USER LIST</h1>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/userdetails/${user.id}`} className="view-button">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;

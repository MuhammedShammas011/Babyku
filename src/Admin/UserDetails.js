import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AdminStyle/UserDetails.css';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false); 


  useEffect(() => {
   
    fetch(`http://localhost:5000/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setIsBlocked(data.blocked); 
      })
      .catch((error) => console.error('Error fetching user details:', error));
  }, [id]);

  const handleBlockUnblock = () => {
    const newBlockedStatus = !isBlocked;
    setIsBlocked(newBlockedStatus);
    axios
      .patch(`http://localhost:5000/users/${id}`, { blocked: newBlockedStatus }) 
      .then((response) => console.log(response.data))
      .catch((error) => console.error('Error updating user status:', error));
  };

  

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-details-container">
      <div className="user-details-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
          alt={`${user.firstName} ${user.lastName}`}
          className="user-avatar"
        />
        <p className="user-detail"><strong>ID:</strong> {user.id}</p>
        <p className="user-detail"><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
        <p className="user-detail"><strong>Gender:</strong> {user.gender}</p>
        <p className="user-detail"><strong>Email:</strong> {user.email}</p>
        <p className="user-detail"><strong>Phone:</strong> {user.phone}</p>
        <p className="user-detail"><strong>Address:</strong> {user.address}</p>

        <button className="block-btn" onClick={handleBlockUnblock}>
          {isBlocked ? "Unblock" : "Block"}
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
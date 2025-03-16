import React, { useState, useEffect } from 'react';
import { createUsers, getUserById, updateUser } from '../services/userService';
import styles from './addUser.module.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Role from '../enums/Role.js';

export default function AddUserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    RoleId: '',
    Address: '',
    Mobile: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);


  useEffect(() => {
    console.log("User ID:", id);
    if (id) {
      setIsEditMode(true);
      const fetchUser = async function () {
        try {
          const user = await getUserById(id);
          console.log("Fetched user:", user);
          setUser({
            Id: id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Password: user.Password,
            RoleId: user.RoleId,
            Address: user.Address,
            Mobile: user.Mobile,
          });
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {

        await updateUser(user);
        alert("User updated successfully");
      } else {
        await createUsers(user);
        alert("User added successfully");
      }
      navigate("/main/users");
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error saving user");
    }
  };

  const handleReset = () => {
    setUser({
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      RoleId: '',
      Address: '',
      Mobile: '',
    });
  };


  return (
    <div className={styles.formContainer}>
      <h2>{isEditMode ? "Update User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input
            type="text"
            name="FirstName"
            value={user.FirstName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input
            type="text"
            name="LastName"
            value={user.LastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="text"
            name="Email"
            value={user.Email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            name="Password"
            value={user.Password}
            onChange={handleChange}
          />
        </div>



        <div className={styles.formGroup}>
          <label>Role</label>
          <select name="RoleId" value={user?.RoleId} onChange={handleChange}>
            <option value="">Select Role</option>
            {Object.entries(Role).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Address</label>
          <input
            type="text"
            name="Address"
            value={user.Address}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Mobile</label>
          <input
            type="text"
            name="Mobile"
            value={user.Mobile}
            onChange={handleChange}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="reset" onClick={handleReset}>Reset</button>
          <button type="submit"> {isEditMode ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  );
}

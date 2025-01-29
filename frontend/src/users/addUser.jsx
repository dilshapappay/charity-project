import React, { useState, useEffect } from 'react';
import { createUsers } from '../services/userService';
import { getRoles } from '../services/roleService';
import styles from './addUser.module.css';
import { useNavigate } from 'react-router-dom';



export default function AddUserForm() {
    const [user, setUser] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        RoleId: '',
        Address: '',
        Mobile: '',
      });

  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async function () {
      try {
        const roles = await getRoles();
        console.log(roles);
        setRoles(roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const newUser = await createUsers(user);
      console.log('New user created:', newUser);
      setUser([...user, newUser]); 
      alert('User added successfully');
      navigate('/main/users');
    }
    catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
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
      <h2>Add User</h2>
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
          <select name="RoleId" value={user.RoleId} onChange={handleChange}>
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.RoleName}
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

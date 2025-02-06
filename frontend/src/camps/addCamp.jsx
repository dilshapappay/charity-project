import React, { useState, useEffect } from 'react';
import { createCamp, getCamps,getCampById,updateCamp } from '../services/campService';
import styles from './addCamp.module.css';
import { getUsers } from '../services/userService';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AddCampForm() {
     const navigate = useNavigate();
          const { id } = useParams();
    const [formData, setFormData] = useState({
        
        CampAdminId: '',
        Name: '',
        Description: '',
        District: '',
        LocationAddress: ''
    });

    const [users, setUsers] = useState([]);
    const [camps, setCamps] = useState([]);
          const [isEditMode, setIsEditMode] = useState(false);
    

          useEffect(() => {
                    console.log("Camp ID:", id);
                    if (id) {
                      setIsEditMode(true);
                      const fetchCamps = async function () {
                        try {
                          const camp = await getCampById(id);
                          console.log("Fetched camp:", camp);
                          setFormData({
                            Id:id,
                            CampAdminId:camp.CampAdminId,
                            Name: camp.Name,
                            Description: camp.Description,
                            District:camp.District,
                            LocationAddress:camp.LocationAddress,
                          });
                        } catch (error) {
                          console.error("Error fetching camp:", error);
                        }
                      };
                      fetchCamps ();
                    }
                  }, [id]);


    useEffect(() => {
        const fetchUsers = async function () {
            try {
                const users = await getUsers();
                console.log('Fetched users:', users);
                setUsers(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchCamps = async function () {
            try {
                const camps = await getCamps();
                console.log('Fetched camps:', camps);
                setCamps(camps.data);
            } catch (error) {
                console.error('Error fetching camps:', error);
            }
        }
        fetchCamps();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            if (isEditMode) {
      
              await updateCamp(formData);
              alert("Camp updated successfully");
            } else {
              await createCamp(formData);
              alert("Camp added successfully");
            }
            navigate("/main/camps");
          } catch (error) {
            console.error("Error saving camp:", error);
            alert("Error saving camp");
          }
        };
    const handleReset = () => {
        setFormData({
            CampAdminId: '',
            Name: '',
            Description: '',
            District: '',
            LocationAddress: ''
        });
    }

    return (
        <div className={styles.formContainer}>
      <h2>{isEditMode ? "Update Camp" : "Add Camp"}</h2>
      <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label For="CampAdminId">Camp Admin</label>
                    <select name="CampAdminId" id="CampAdminId"   value={formData.CampAdminId} onChange={handleChange}>
                        <option value="">Select Camp Admin</option>
                        {users.map(user => (
                            <option key={user.Id} value={user.Id}>{`${user.FirstName} ${user.LastName}`}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label For="CampName">Camp Name</label>
                    <input type="text" name="Name" id="Name"
                    value={formData.Name}  onChange={handleChange} />

                </div>
                <div className={styles.formGroup}>
                    <label For="Description">Description</label>
                    <input type="text" name="Description" id="Description" 
                    value={formData.Description}  onChange={handleChange} />
                </div>



                <div className={styles.formGroup}>
                    <label For="District">District</label>
                    <select name="District" id="District"value={formData.District} onChange={handleChange}>
                        <option value="">Select District</option>
                        {camps.map(camp => (
                            <option key={camp.Id}value={camp.District}>{camp.District}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label For="LocationAddress">Location Address</label>
                    <input type="text" name="LocationAddress" id="LocationAddress" 
                    value={formData.LocationAddress}  onChange={handleChange} />
                </div>
                <br></br>
                <div className={styles.buttonGroup}>
                    <button type="reset" onClick={handleReset}>Reset</button>
                    <button type="submit"> {isEditMode ? "Update" : "Submit"}</button>
                </div>
            </form>
        </div>
    );
}
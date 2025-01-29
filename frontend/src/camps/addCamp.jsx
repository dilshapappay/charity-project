import React, { useState, useEffect } from 'react';
import { createCamp, getCamps } from '../services/campService';
import styles from './addCamp.module.css';
import { getUsers } from '../services/userService';
import { useNavigate } from 'react-router-dom';


export default function AddCampForm() {
    const [formData, setFormData] = useState({
        CampAdminId: '',
        Name: '',
        Description: '',
        District: '',
        LocationAddress: ''
    });

    const [users, setUsers] = useState([]);
    const [camps, setCamps] = useState([]);
        const navigate = useNavigate();
    

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
                setCamps(camps);
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
            const newCamp = await createCamp(formData);
            console.log('New camp created:', newCamp);
            setCamps([...camps, newCamp]); 
            alert('Camp added successfully');
            navigate('/main/camps');

        } catch (error) {
            console.error('Error creating camp:', error);
            alert('Error creating camp');
        }
    }

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
            <h2>Add Camp</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label For="CampAdminId">Camp Admin</label>
                    <select name="CampAdminId" id="CampAdminId"   value={formData.Name} onChange={handleChange}>
                        <option value="">Select Camp Admin</option>
                        {users.map(user => (
                            <option key={user.Id} value={user.Id}>{`${user.FirstName} ${user.LastName}`}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label For="CampName">Camp Name</label>
                    <input type="text" name="Name" id="Name"
                    value={camps.Name}  onChange={handleChange} />

                </div>
                <div className={styles.formGroup}>
                    <label For="Description">Description</label>
                    <input type="text" name="Description" id="Description" 
                    value={camps.Description}  onChange={handleChange} />
                </div>



                <div className={styles.formGroup}>
                    <label For="District">District</label>
                    <select name="District" id="District" onChange={handleChange}>
                        <option value="">Select District</option>
                        {camps.map(camp => (
                            <option key={camp.Id} value={camp.Id}>{camp.District}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label For="LocationAddress">Location Address</label>
                    <input type="text" name="LocationAddress" id="LocationAddress" 
                    value={camps.LocationAddress}  onChange={handleChange} />
                </div>
                <br></br>
                <div className={styles.buttonGroup}>
                    <button type="reset" onClick={handleReset}>Reset</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
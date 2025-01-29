import React, { useState, useEffect } from 'react';
import { createRequirement } from '../services/requirementService';
import{getItems} from '../services/itemService';
import styles from './addRequirement.module.css';
import { getCamps } from '../services/campService';
import { useNavigate } from 'react-router-dom';


export default function AddRequirementForm() {
    const [requirement,setRequirement] = useState({
        ItemId : '',
        CampId : '',
        StatusId: '',
        RequiredQuantity: '',
        AchievedQuantity: ''

    });

    const [items, setItems] = useState([]);
    const [camps, setCamps] = useState([]);
        const navigate = useNavigate();
    


    useEffect(() => {
        const fetchItems = async function () {
            try {
                const items = await getItems();
                console.log(items);
                setItems(items);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
            }
            fetchItems();
        }, []);

        useEffect(() => {
            const fetchCamps = async function () {
                try {
                    const camps = await getCamps();
                    console.log(camps);
                    setCamps(camps);
                } catch (error) {
                    console.error('Error fetching camps:', error);
                }
                }
                fetchCamps();
            }, []);



            const handleChange = (e) => {
                setRequirement({
                  ...requirement,
                  [e.target.name]: e.target.value,
                });
              };
    
        const handleSubmit = async (e) => {
            e.preventDefault(); 
            try {
            const newRequirement = await createRequirement(requirement); 
            console.log('Requirement successfully created:', newRequirement);
            alert('Requirement added successfully!');
            navigate('/main/requirements');

            } catch (error) {
            console.error('Error creating requirement:', error);
            }
        };

        const handleReset = () => {
            setRequirement({
                ItemId : '',
                CampId : '',
                StatusId: '',
                RequiredQuantity: '',
                AchievedQuantity: ''
            });
        };


    return (

        <div className={styles.formContainer}>
        <h2>Add Requirement</h2>
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
            <label>Item </label>
            <select name="ItemId" value={requirement.ItemId} onChange={handleChange}>
            <option value="">Select Item</option>
            {items.map((item) => (
            <option key={item.Id} value={item.Id}>
            {item.Name}
            </option>
            ))}
          </select>
            
            </div>
            <div className={styles.formGroup}>
            <label>Camp</label>
           
            <select name="CampId" value={requirement.CampId} onChange={handleChange}>
            <option value="">Select Camp</option>
            { 
            camps.map((camp) => (
            <option key={camp.Id} value={camp.Id}>
            {camp.Name}
            

            </option>
            ))}
          </select>
            </div>
            <div className={styles.formGroup}>
            <label>Status Id</label>
            <input
                type="text"
                name="StatusId"
                value={requirement.StatusId}
                onChange={handleChange}
            />
            </div>
            <div className={styles.formGroup}>
            <label>Required Quantity</label>
            <input
                type="text"
                name="RequiredQuantity"
                value={requirement.RequiredQuantity}
                onChange={handleChange}
            />
            </div>
            <div className={styles.formGroup}>
            <label>Achieved Quantity</label>
            <input
                type="text"
                name="AchievedQuantity"
                value={requirement.AchievedQuantity}
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


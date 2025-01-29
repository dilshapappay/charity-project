import React, { useState } from 'react';
import { createItems } from '../services/itemService';
import styles from './addItem.module.css';
import { useNavigate } from 'react-router-dom';


export default function AddItemForm() {
    const [item, setItem] = useState({
        Name: '',
        Description: '',
    });

    const navigate = useNavigate();


    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newItem = await createItems(item);
            console.log('Item successfully created:', newItem);
            alert('Item added successfully!');
            navigate('/main/items');
        } catch (error) {
            console.error('Error creating item:', error);
            alert('Error creating item. Please try again.');
        }
    };

    const handleReset = () => {
        setItem({
            Name: '',
            Description: '',
        });
    };

    return (
        <div className={styles.formContainer}>
            <h2>Add Item</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="Name">Item Name</label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={item.Name}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="Description">Item Description</label>
                    <input
                        type="text"
                        id="Description"
                        name="Description"
                        value={item.Description}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button type="reset" onClick={handleReset}>
                        Reset
                    </button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

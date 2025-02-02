import React, { useState,useEffect } from 'react';
import { createItems,updateItem,getItemById } from '../services/itemService';
import styles from './addItem.module.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AddItemForm() {
    const navigate = useNavigate();
      const { id } = useParams();
    const [item, setItem] = useState({
        Name: '',
        Description: '',
    });
      const [isEditMode, setIsEditMode] = useState(false);
    

      useEffect(() => {
          console.log("Item ID:", id);
          if (id) {
            setIsEditMode(true);
            const fetchItems = async function () {
              try {
                const item = await getItemById(id);
                console.log("Fetched item:", item);
                setItem({
                  Id:id,
                  Name: item.Name,
                  Description: item.Description,
                });
              } catch (error) {
                console.error("Error fetching item:", error);
              }
            };
            fetchItems ();
          }
        }, [id]);
      


    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value,
        });
    };

   
     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         if (isEditMode) {
   
           await updateItem(item);
           alert("Item updated successfully");
         } else {
           await createItems(item);
           alert("Item added successfully");
         }
         navigate("/main/items");
       } catch (error) {
         console.error("Error saving item:", error);
         alert("Error saving item");
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
      <h2>{isEditMode ? "Update Item" : "Add Item"}</h2>
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
                    <button type="submit"> {isEditMode ? "Update" : "Submit"}</button>
                    </div>
            </form>
        </div>
    );
}

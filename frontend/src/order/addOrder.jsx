import React, { useState, useEffect } from 'react';
import { createOrder,getOrderById,updateOrder } from '../services/orderService';
import { getUsers } from '../services/userService';
import { getRequirements } from '../services/requirementService';
import styles from './addOrder.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";




export default function AddOrderForm() {
     const navigate = useNavigate();
      const { id } = useParams();
    const [formData, setFormData] = useState({
        
        UserId: '',
        RequirementId: '',
        StatusId: '',
        Quantity: '',
    });

    const [users, setUsers] = useState([]);
    const [requirements, setRequirements] = useState([]);
      const [isEditMode, setIsEditMode] = useState(false);
    

      useEffect(() => {
          console.log("Order ID:", id);
          if (id) {
            setIsEditMode(true);
            const fetchOrder = async function () {
              try {
                const order = await getOrderById(id);
                console.log("Fetched volunteer:", order);
                setFormData({
                  Id:id,
                 UserId:order.UserId,
                  RequirementId: order.RequirementId,
                   StatusId: order.StatusId,
                  Quantity: order.Quantity,
                });
              } catch (error) {
                console.error("Error fetching order:", error);
              }
            };
            fetchOrder();
          }
        }, [id]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getUsers();
                console.log('Fetched users:', users);
                setUsers(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const requirements = await getRequirements();
                console.log('Fetched requirements:', requirements);
                setRequirements(requirements);
            } catch (error) {
                console.error('Error fetching requirements:', error);
            }
        };
        fetchRequirements();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         if (isEditMode) {
   
           await updateOrder(formData);
           alert("Order updated successfully");
         } else {
           await createOrder(formData);
           alert("Order added successfully");
         }
         
         navigate("/main/orders");
       } catch (error) {
         console.error("Error saving order:", error);
         alert("Error saving order");
       }
     };
    const handleReset = () => {
        setFormData({
            UserId: '',
            RequirementId: '',
            StatusId: '',
            Quantity: '',
        });
    };

    return (
        <div className={styles.formContainer}>
  <h2>{isEditMode ? "Update Order" : "Add Order"}</h2>            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="UserId">Customer Name</label>
                    <select name="UserId" value={formData.UserId} onChange={handleChange}>
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user.Id} value={user.Id}>
                                {`${user.FirstName} ${user.LastName}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="RequirementId">Product Name</label>
                    <select name="RequirementId" value={formData.RequirementId} onChange={handleChange}>
                        <option value="">Select Requirement</option>
                        {requirements.map((requirement) => (
                            <option key={requirement.Id} value={requirement.Id}>
                                {requirement.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="StatusId">Status</label>
                    <input type="text" name="StatusId" value={formData.StatusId} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="Quantity">Quantity</label>
                    <input type="text" name="Quantity" value={formData.Quantity} onChange={handleChange} />
                </div>
                <div className={styles.buttonGroup}>
                    <button type="button" onClick={handleReset}>
                        Reset
                    </button>
                    <button type="submit">{isEditMode ? "Update" : "Submit"}</button>
                </div>
            </form>
        </div>
    );
}

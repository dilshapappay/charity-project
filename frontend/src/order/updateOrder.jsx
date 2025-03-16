import React, { useState, useEffect } from 'react';
import { getOrderById, updateOrder } from '../services/orderService';
import { getUsers } from '../services/userService';
import { getRequirements } from '../services/requirementService';
import styles from './updateOrder.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function UpdateOrderForm() {
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

  useEffect(() => {
    console.log("Order ID:", id);
    if (id) {
      const fetchOrder = async function () {
        try {
          const order = await getOrderById(id);
          const users = await getUsers();
          const user = users.data.find(u => u.Id === order.UserId);

          const requirements = await getRequirements();
          const requirement = requirements.data.find(r => r.Id === order.RequirementId);
          setFormData({
            Id: id,
            UserId: user ? `${user.FirstName} ${user.LastName}` : "",
            RequirementId: requirement ? requirement.Name : "",
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
        setUsers(users.data);
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
        setRequirements(requirements.data);
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
      await updateOrder(formData);
      alert("Order updated successfully");
      navigate("/main/orders");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Error updating order");
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
      <h2>Update Order</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="UserId">Customer Name</label>
          <input type="text" name="UserId" value={formData.UserId} onChange={handleChange} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="RequirementId">Product Name</label>
          <input type="text" name="RequirementId" value={formData.RequirementId} onChange={handleChange} readOnly />
        </div>
       
        <div className={styles.formGroup}>
          <label htmlFor="Quantity">Quantity</label>
          <input type="text" name="Quantity" value={formData.Quantity} onChange={handleChange} />
        </div>
        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { createOrder, getOrderById, updateOrder } from '../services/orderService';
import styles from './order.module.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getRequirementById } from '../services/requirementService';

export default function AddOrderForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reqid = queryParams.get('reqid');

  const [order, setOrder] = useState({
    RequirementId: reqid || '',
    Quantity: '',
  });

  const [requirement, setRequirement] = useState({
    
    RequirementName: '',
    CampName: '',
    RequiredQuantity: '',
    AchievedQuantity: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchOrder = async function () {
        try {
          const order = await getOrderById(id);
          setOrder({
            Id: id,
            Quantity: order.Quantity,
          })
          setRequirement({
            RequirementName: order.RequirementName,
            CampName: order.CampName,
            RequiredQuantity: order.RequiredQuantity,
            AchievedQuantity: order.AchievedQuantity
          })

          ;
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      };
      fetchOrder();
    }

    if (reqid) {
      const getRequirement = async () => {
        try {
          const requirement = await getRequirementById(reqid);
          setRequirement({
            RequirementName: requirement.Name,
            CampName: requirement.CampName,
            RequiredQuantity: requirement.RequiredQuantity,
            AchievedQuantity: requirement.AchievedQuantity
          });
        } catch (error) {
          console.error("Error fetching requirement:", error);
        }
      }
      getRequirement();
    }
  }, [id, reqid]);

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        debugger
        await updateOrder(order);
        alert("Order updated successfully");
      } else {
        await createOrder(order);
        alert("Order added successfully");
      }
      navigate("/main/orders");
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Error saving order");
    }
  };

  const handleReset = () => {
    setOrder({
      UserId: '',
      RequirementId: reqid || '',
      Quantity: '',
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>{isEditMode ? "Update Order" : "Add Order"}</h2>
      <div className={styles.requirementDetails}>
        <p><strong>Requirement:</strong> {requirement.RequirementName}</p>
        <p><strong>Required Quantity:</strong> {requirement.RequiredQuantity}</p>
        <p><strong>Achieved Quantity:</strong> {requirement.AchievedQuantity}</p>
        <p><strong>Camp:</strong> {requirement.CampName}</p>
        
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Quantity</label>
          <input
            type="text"
            name="Quantity"
            value={order.Quantity}
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
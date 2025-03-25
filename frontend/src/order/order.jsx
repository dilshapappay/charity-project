import React, { useEffect, useState } from 'react';
import styles from './order.module.css';
import { getOrders, deleteOrder } from "../services/orderService";
import { useNavigate } from 'react-router-dom';
import OrderStatus from "../orderStatus";
import {Role} from '../enums/Role';
import {markAsReceived} from '../services/orderService';

import {approveOrder,rejectOrder} from '../services/orderService';


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(""); // State for selected status

  const userRole = localStorage.getItem('role');

  const fetchOrders = async function () {
    try {
      const response = await getOrders(page, limit);
      setOrders(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }


  useEffect(() => {
    fetchOrders(page, limit);
  }, [page, limit]);

  const handleDeleteClick = async (Id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        var result = await deleteOrder(Id);
        alert(result.message);
        fetchOrders();
      } catch (error) {

        alert(error.message);
      }
    }
  };
  const handleApproveClick = async (id) => {
    if (window.confirm('Are you sure you want to approve this order?')) {
      try {
        const result = await approveOrder(id); 
        alert(result.message);
        fetchOrders(); 
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  
  const handleRejectClick = async (id) => {
    if (window.confirm('Are you sure you want to reject this order?')) {
      try {
        const result = await rejectOrder(id); 
        alert(result.message);
        fetchOrders(); 
      } catch (error) {
        alert(error.message);

      }
    }
  };
  


   const handleReceivedClick = async (id) => {
    if (window.confirm('Have you received this order?')) {
      try {
        const result = await markAsReceived(id); // Update status to "Completed"
        alert(result.message);
        fetchOrders();
      } catch (error) {
        alert(error.message);
      }
    }
  };
  const handleEditClick = (Id) => {
    navigate(`/main/updateOrder/${Id}`);
  };

  const handleStatusFilterChange = (e) => {
    setSelectedStatus(e.target.value); // Update selected status
  };

  const filteredOrders = selectedStatus
    ? orders.filter((order) => Number(order.StatusId) === Number(selectedStatus))
    : orders;

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const getStatusClass = (statusId) => {
    switch (statusId) {
      case 1: // Assuming 1 is for Pending
        return 'status-pending';
      case 2: // Assuming 2 is for Completed
        return 'status-completed';
      case 3: // Assuming 3 is for Cancelled
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className={styles.tableContainer}>
      <h2>Order Details</h2>

      <div className={styles.filterContainer}>
        <select className="filter" value={selectedStatus} onChange={handleStatusFilterChange}>
          <option value="">Select Status</option>
          {Object.entries(OrderStatus).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sl</th>
            <th>Customer</th>
            <th>Product Name</th>
            <th>Status</th>
            <th>Quantity</th>
            {(userRole == Role.Master || userRole == Role["Camp Admin"]) && <th>Approve/Reject</th>}
           <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 && filteredOrders.map((order, index) => (
            <tr key={order.Id}>
              <td>{index + 1}</td>
              <td>{`${order.FirstName} ${order.LastName}`}</td>
              <td>{order.ProductName}</td>
              <td className={getStatusClass(order.StatusId)}>{OrderStatus[Number(order.StatusId)]}</td>
              <td>{order.Quantity}</td>
              {(userRole == Role.Master || userRole == Role['Camp Admin']) && (
                <td>
                  <div className={styles.actionIcons}>
                    {order.StatusId === 1 && (
                      <>
                      
                        <button onClick={() => handleApproveClick(order.Id)}>Approve</button>
                        <button onClick={() => handleRejectClick(order.Id)}>Reject</button>
                      </>
                    )}
                     {order.StatusId === 2 && (
                    <button onClick={() => handleReceivedClick(order.Id)} className={styles.receivedButton}>
                      Received
                    </button>
                  )}
                    
                  </div>
                </td>
              )}
              <td>
                <div className={styles.actionIcons}>
                
                  <i className="material-icons" onClick={() => handleEditClick(order.Id)}>edit</i>
                  <i className="material-icons" onClick={() => handleDeleteClick(order.Id)}>delete</i>
                </div>

               
              </td>
            
            </tr>
          ))}
          {filteredOrders.length === 0 && (
            <tr>
              <td colSpan={6} className="no-data-table">No data found!!!</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
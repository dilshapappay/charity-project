import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './order.module.css';
import { getOrders,deleteOrder } from "../services/orderService";
import { useNavigate } from 'react-router-dom';



 export default function Orders() {
    const [orders, setOrders] = useState([]); 
    const [page, setPage] = useState(1);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(1);
   const navigate = useNavigate();



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

      const handleEditClick = (Id) => {
        navigate(`/main/editOrder/${Id}`);
    };

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
    
    

    
    return (
        <div className={styles.tableContainer}>
            <h2>Order Details</h2>
            
            
            <table>
                <thead>
                    <tr>
                        <th>Sl</th>
                        <th>customer</th>
                        <th>Product Name</th>
                        <th>Status</th>
                        <th>Quantity</th>
                         <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.Id}>
                            <td>{index + 1}</td>
                            <td>{`${order.FirstName} ${order.LastName}`}</td > 
                            <td>{order.ProductName}</td>
                            <td>{order.StatusId}</td>
                            <td>{order.Quantity}</td>
                            <td>  <div className={styles.actionIcons}>
                                <i className="material-icons" onClick={() => handleEditClick(order.Id)} >edit</i>
                                <i className="material-icons" onClick={() => handleDeleteClick(order.Id)} >delete</i>
                            </div></td>
                        </tr>
                    ))}
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
import React, { useEffect, useState } from 'react';
import { getDashboard, getOrderStatusData } from '../services/dashboardService';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Dashboard.module.css';
import OrderStatusPieChart from './OrderStatusPieChart';


Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRequirements: 0,
    totalCamps: 0,
  });

  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  
  const [orderStatus, setOrderStatus] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    completed: 0,
  });
  
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getDashboard();
        setCounts(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const data = await getOrderStatusData();
        setOrderStatus(data);
      } catch (error) {
        console.error('Error fetching order status data:', error);
      } finally {
        setChartLoading(false);
      }
    };

    fetchOrderStatus();
  }, []);

  // Prepare data for the Pie Chart
  const pieChartData = {
    labels: ['Pending', 'Approved', 'Rejected', 'Completed'],
    datasets: [
      {
        data: [
          orderStatus.pending,
          orderStatus.approved,
          orderStatus.rejected,
          orderStatus.completed,
        ],
        backgroundColor: ['#f1c40f', '#2ecc71', '#e74c3c', '#3498db'],
        hoverBackgroundColor: ['#f39c12', '#27ae60', '#c0392b', '#2980b9'],
      },
    ],
  };
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.chartSection}>
        {chartLoading ? (
          <div className={styles.loading}>Loading Chart...</div>
        ) : (
          <OrderStatusPieChart pieChartData={pieChartData} />
        )}
      </div>
      <div className={styles.cards}>
        <div className={`${styles.card} ${styles.slideUp}`}>
          <h3>Total Users</h3>
          <p>{counts.totalUsers}</p>
        </div>
        <div className={`${styles.card} ${styles.slideUp}`}>
          <h3>Total Orders</h3>
          <p>{counts.totalOrders}</p>
        </div>
        <div className={`${styles.card} ${styles.slideUp}`}>
          <h3>Total Requirements</h3>
          <p>{counts.totalRequirements}</p>
        </div>
        <div className={`${styles.card} ${styles.slideUp}`}>
          <h3>Total Camps</h3>
          <p>{counts.totalCamps}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

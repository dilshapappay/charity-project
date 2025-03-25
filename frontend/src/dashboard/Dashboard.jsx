import React, { useEffect, useState } from 'react';
import { getDashboard, getOrderStatusData, getQuantityData } from '../services/dashboardService';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartTooltip, Legend as RechartLegend, ResponsiveContainer } from "recharts";

import styles from './Dashboard.module.css';
import OrderStatusPieChart from './OrderStatusPieChart';
import OrderStatus from "../orderStatus";

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
    [OrderStatus[1]]: 0, 
    [OrderStatus[2]]: 0, 
    [OrderStatus[3]]: 0, 
    [OrderStatus[4]]: 0, 
  });

  const [quantityData, setQuantityData] = useState([]); 

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
        debugger;
        const data = await getOrderStatusData();
        console.log("Order Status Data:", data);
        setOrderStatus({
          [OrderStatus[1]]: data.pending,
          [OrderStatus[2]]: data.processing,
          [OrderStatus[3]]: data.completed,
          [OrderStatus[4]]: data.cancelled,
        });
      } catch (error) {
        console.error('Error fetching order status data:', error);
      } finally {
        setChartLoading(false);
      }
    };

    fetchOrderStatus();
  }, []);

 
  useEffect(() => {
    const fetchQuantityData = async () => {
      try {
        debugger;
        const data = await getQuantityData();
        console.log("Quantity Data:", data);
        setQuantityData(data);
      } catch (error) {
        console.error('Error fetching quantity data:', error);
      }
    };

    fetchQuantityData();
  }
  , []);

  const pieChartData = orderStatus ? {
    labels: Object.values(OrderStatus), 
    datasets: [
      {
        data: [
          orderStatus[OrderStatus[1]], 
          orderStatus[OrderStatus[2]], 
          orderStatus[OrderStatus[3]], 
          orderStatus[OrderStatus[4]]
        ],
        backgroundColor: ['#FFE680', '#80BFFF ', '#28A745', '#DC3545'], 
        hoverBackgroundColor: ['#E6B800', '#0056B3', '#7DDF91 ', '#FF9999 '],
      },
    ],
  } : null;

  const barChartData = quantityData.map(item => ({
    District: item.District || "Unknown", 
    TotalRequiredQuantity: item.totalrequiredquantity ? Number(item.totalrequiredquantity) : 0,
    TotalAchievedQuantity: item.totalachievedquantity ? Number(item.totalachievedquantity) : 0
  }));
  
  

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      
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
<div className={styles.mainChartSection}>
      <div className={styles.chartSection}>
        {chartLoading ? (
          <div className={styles.loading}>Loading Chart...</div>
        ) : (
          <OrderStatusPieChart pieChartData={pieChartData} />
        )}
      </div>
        {/* Bar Chart Section */}
        <div className={styles.barChartSection}>
   

<ResponsiveContainer width="100%" height={400}>
  <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
    <XAxis dataKey="District" angle={-45} textAnchor="end" interval={0} />
    <YAxis />
    <RechartTooltip />
    <RechartLegend />
    <Bar dataKey="TotalRequiredQuantity" fill="#ff6b6b" name="Required Quantity" />
    <Bar dataKey="TotalAchievedQuantity" fill="#1e90ff" name="Achieved Quantity" />
  </BarChart>
</ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

// OrderStatusPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import styles from './OrderStatusPieChart.module.css'; // Optional: your styling file

const OrderStatusPieChart = ({ pieChartData }) => {
  return (
    <div className={styles.chartContainer}>
    
      <Pie data={pieChartData} />
      <h3>Order Status Distribution</h3>
    </div>
  );
};

export default OrderStatusPieChart;

import apiClient from './apiClient';

export function getDashboard() {
  return apiClient('/dashboard',
     { method: 'GET' }) 
    .then(response => response)
    .catch(error => {
      console.error('Error fetching dashboard data:', error);
      throw error;
    });
}

export function getOrderStatusData() {
  return apiClient('/dashboard/order-status', { method: 'GET' }) // Corrected API endpoint
  .then(response => response)
  .catch(error => {
      console.error('Error fetching order status data:', error);
      throw error;
  });
}

export function getQuantityData() {
  return apiClient('/dashboard/quantity', { method: 'GET' }) // Corrected API endpoint
  .then(response => response)
  .catch(error => {
      console.error('Error fetching quantity data:', error);
      throw error;
  });
}
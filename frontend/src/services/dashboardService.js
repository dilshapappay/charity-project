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
  return apiClient('/status-counts', { method: 'GET' })
    .then(response => response)
    .catch(error => {
      console.error('Error fetching order status data:', error);
      throw error;
    });
}
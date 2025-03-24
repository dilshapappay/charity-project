import apiClient from './apiClient';

export function getOrders(page = 1, limit = 10) {
  return apiClient(`/Orders?page=${page}&limit=${limit}`);
}

export function getOrderById(id) {
  return apiClient(`/Orders/${id}`);
}

export function createOrder(order) {
  return apiClient('/Orders', {
    method: 'POST',
    body: order
  });
}

export function updateOrder(order) {
  return apiClient('/Orders', {
    method: 'PUT',
    body: order
  });
}

export function deleteOrder(id) {
  return apiClient('/Orders', {
    method: 'DELETE',
    body: { id }
  });
}

export function approveOrder(id) {
  return apiClient(`/Orders/approve/${id}`, {
    method: 'PUT'
  });
}

export function rejectOrder(id) {
  return apiClient(`/Orders/reject/${id}`, {
    method: 'PUT'
  });
}

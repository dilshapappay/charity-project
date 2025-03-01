import apiClient from './apiClient';

export function getUsers(page = 1, limit = 10) {
  return apiClient(`/users?page=${page}&limit=${limit}`);
}

export function getUserById(id) {
  return apiClient(`/users/${id}`);
}

export function createUsers(user) {
  return apiClient('/users', {
    method: 'POST',
    body: user
  });
}

export function updateUser(user) {
  return apiClient(`/users`, {
    method: 'PUT',
    body: user
  });
}

export function deleteUser(id) {
  return apiClient(`/users`, {
    method: 'DELETE',
    body: { id }
  });
}
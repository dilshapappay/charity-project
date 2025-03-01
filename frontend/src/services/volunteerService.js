import apiClient from './apiClient';

export function getVolunteers(page = 1, limit = 10) {
  return apiClient(`/volunteers?page=${page}&limit=${limit}`);
}

export function getVolunteerById(id) {
  return apiClient(`/volunteers/${id}`);
}

export function createVolunteer(volunteer) {
  return apiClient('/volunteers', {
    method: 'POST',
    body: volunteer
  });
}

export function updateVolunteer(volunteer) {
  return apiClient('/volunteers', {
    method: 'PUT',
    body: volunteer
  });
}

export function deleteVolunteer(id) {
  return apiClient(`/volunteers`, {
    method: 'DELETE',
    body: { id }
  });
}
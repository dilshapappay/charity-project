import apiClient from './apiClient';

export function getCamps(page = 1, limit = 10){
    return apiClient(`/camps?page=${page}&limit=${limit}`);
 
}


export function getCampById(id) {
  return apiClient(`/camps/${id}`);
}

export function createCamp(camp) {
  return apiClient('/camps', {
    method: 'POST',
    body: camp
  });
}

export function updateCamp(camp) {
  return apiClient('/camps' , {
    method: 'PUT',
    body: camp
  });
}

export function deleteCamp(id) {
  return apiClient(`/camps`, {
    method: 'DELETE',
    body: { id }
  });
}


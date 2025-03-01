import apiClient from './apiClient';

export function getRequirements(district="",category="",page = 1, limit = 10) {

  var url = `/requirements?page=${page}&limit=${limit}`;

  if(district){
    url = url+`&district=${district}`
  }

  if(category){
    url = url+`&categories=${category}`
  }
  return apiClient(url);
}

export function getRequirementById(id) {
  return apiClient(`/requirements/${id}`);
}

export function createRequirement(requirement) {
  return apiClient('/requirements', {
    method: 'POST',
    body: requirement
  });
}

export function updateRequirement(requirement) {
  return apiClient('/requirements', {
    method: 'PUT',
    body: requirement
  });
}

export function deleteRequirement(id) {
  return apiClient(`/requirements`, {
    method: 'DELETE',
    body: { id }
  });
}
import apiClient from './apiClient';

export async function login(email, password) {
  return apiClient('/account/login', {
    method: 'POST',
    body: { email, password },
    includeToken: false 
  });
}

export async function register(firstName, lastName, email, password) {
  return apiClient('/account/Register', {
    method: 'POST',
    body: { firstName, lastName, email, password, password2: password },
    includeToken: false
  });
}
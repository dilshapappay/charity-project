import apiClient from './apiClient';

export function getRoles(){
    return apiClient(`/roles`);

}
     
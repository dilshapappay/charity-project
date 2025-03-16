import apiClient from './apiClient';

export function getItems(page = 1, limit = 10){
    return apiClient(`/items?page=${page}&limit=${limit}`);
}

export function getItemById(id){
  return apiClient(`/items/${id}`); 
}
export function createItems(item){
    return apiClient(`/items`, {
        method: 'POST',
        body: item
      });
}


export function updateItem(item) {
  return apiClient('/items', {
    method: 'PUT',
    body: item
  });
}




export function deleteItem(Id) {
  return apiClient(`/items`, {
    method: 'DELETE',
    body: { Id }
  });
}
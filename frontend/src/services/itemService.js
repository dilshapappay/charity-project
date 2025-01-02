const API_URL = process.env.REACT_APP_API_URL;

export function getItems(){
    return fetch(`${API_URL}/items`)
    .then(response => response.json())
    .then(data => data);
}

export function updateItems(){
    
}

export function deleteItems(){
    
}
export function getItems(){
    return fetch('http://localhost:3000/api/items')
    .then(response => response.json())
    .then(data => data);
}

export function updateItems(){
    
}

export function deleteItems(){
    
}
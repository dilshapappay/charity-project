export function getItems(){
    return fetch('/api/items')
    .then(response => response.json())
    .then(data => data);
}

export function updateItems(){
    
}

export function deleteItems(){
    
}
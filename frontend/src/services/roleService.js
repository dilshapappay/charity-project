const API_URL = process.env.REACT_APP_API_URL;

export function getRoles(){
    return fetch(`${API_URL}/roles`)
    .then(response => response.json())
    .then(data => data);
}
     
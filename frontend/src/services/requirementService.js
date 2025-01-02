const API_URL = process.env.REACT_APP_API_URL;

export function getRequirements(){
    return fetch(`${API_URL}/requirements`)
    .then(response => response.json())
    .then(data => data);
}

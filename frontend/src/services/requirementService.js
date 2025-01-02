const API_URL = process.env.REACT_APP_API_URL;

export function getRequirements(data){
    const url = new URL(`${API_URL}/requirements`);

    if(data){
        Object.keys(data).forEach(key => url.searchParams.append(key, data[key]));
    }

    return fetch(url.toString())
    .then(response => response.json())
    .then(data => data);
}

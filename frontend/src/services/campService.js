const API_URL = process.env.REACT_APP_API_URL;

export function getCamps(page = 1, limit = 10){
    return fetch(`${API_URL}/camps?page=${page}&limit=${limit}`)
    .then(response => response.json())
    .then(data => data);
}


export function getCampById(id){
  return fetch(`${API_URL}/camps/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(response => response.json());
}


export function createCamp(camp){
    return fetch(`${API_URL}/camps`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(camp),
})


    .then(response => response.json())
    .then(data => data);
}

export function updateCamp(camp){
  debugger
    return fetch(`${API_URL}/camps`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(camp),
    })
    .then(response => response.json())
    .then(data => data);
}

export function deleteCamp(id) {
    return fetch(`${API_URL}/camps`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(async (response) => {
        var result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        return result;
      });
  }
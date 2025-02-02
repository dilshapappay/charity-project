const API_URL = process.env.REACT_APP_API_URL;

export function getVolunteers(page = 1, limit = 10){
    return fetch(`${API_URL}/volunteers?page=${page}&limit=${limit}`)
    .then(response => response.json())
    .then(data => data);
}

export function getVolunteerById(id){
  return fetch(`${API_URL}/volunteers/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(response => response.json());
}



export function createVolunteer(volunteer){
    return fetch(`${API_URL}/volunteers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteer),
    })
    .then(response => response.json())
    .then(data => data);
}

export function updateVolunteer(volunteer){
    return fetch(`${API_URL}/volunteers`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteer),
    })
    .then(response => response.json())
    .then(data => data);
}

export function deleteVolunteer(id) {
    return fetch(`${API_URL}/volunteers`, {
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
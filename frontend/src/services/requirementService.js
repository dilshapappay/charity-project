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




export function getRequirementById(id){
  return fetch(`${API_URL}/requirements/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(response => response.json());
}



export function createRequirement(requirement){
    return fetch(`${API_URL}/requirements`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requirement),
})


    .then(response => response.json())
    .then(data => data);
}

export function updateRequirement(requirement){
    return fetch(`${API_URL}/requirements`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requirement),
    })
    .then(response => response.json())
    .then(data => data);
}


export function deleteRequirement(id) {
    return fetch(`${API_URL}/requirements`, {
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
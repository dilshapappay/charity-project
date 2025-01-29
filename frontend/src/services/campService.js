const API_URL = process.env.REACT_APP_API_URL;

export function getCamps(){
    return fetch(`${API_URL}/camps`)
    .then(response => response.json())
    .then(data => data);
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
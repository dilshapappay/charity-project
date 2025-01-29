const API_URL = process.env.REACT_APP_API_URL;

export function getItems(){
    return fetch(`${API_URL}/items`)
    .then(response => response.json())
    .then(data => data);
}

export function createItems(item){
    return fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    })
    .then(response => response.json())
    .then(data => data);
}

export function deleteItem(Id) {
    return fetch(`${API_URL}/items`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Id }),
    })
      .then(async (response) => {
        var result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        return result;
      });
  }
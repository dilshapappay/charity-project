
const API_URL = process.env.REACT_APP_API_URL;

export function  getOrders(){
    return fetch(`${API_URL}/Orders`)
    .then(response => response.json())
    .then(data => data);
}

export function getOrderById(id){
  return fetch(`${API_URL}/Orders/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(response => response.json());
}



export function createOrder(order){
    return fetch(`${API_URL}/Orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
    .then(response => response.json())
    .then(data => data);
}

export function updateOrder(order){
    return fetch(`${API_URL}/Orders`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
    .then(response => response.json())
    .then(data => data);
}

export function deleteOrder(id) {
    return fetch(`${API_URL}/Orders`, {
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
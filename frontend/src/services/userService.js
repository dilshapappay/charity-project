const API_URL = process.env.REACT_APP_API_URL;

export function getUsers(){
    return fetch(`${API_URL}/users`)
    .then(response => response.json())
    .then(data => data);
}

export function createUsers(user){
    return fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
})


    .then(response => response.json())
    .then(data => data);
}
export function deleteUser(id) {
    return fetch(`${API_URL}/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(async (response) => {
        debugger
        var result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        return result;
      });
  }
  
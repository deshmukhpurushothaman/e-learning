export const updateUserProfile = (userId, data,token) => {
    console.log("User Profile API", data)
    return fetch(`http://localhost:8000/api/user/${userId}`,{
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("Error-UA-10-1-", err));
  }

export const contactUs = (data) => {
  console.log("Contact Us api", data)
  return fetch(`http://localhost:8000/api/user/contact`,{
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((response) => {
    return response.json();
  })
  .catch((err) => console.log("Error-UA-10-1-", err));
}
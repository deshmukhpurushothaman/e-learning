export const getQuizById = (quizId) => {
    return fetch(`http://localhost:8000/api/quiz/${quizId}`, {
      method: "GET",
    })
      .then((response) => {
        //console.log("Recieved Data", response.json());
        return response.json();
      })
      .catch((err) => console.log("Error-PO-20-3-", err));
  };

  export const getSingleUser = (userId, token) => {
    console.log("Get Single User",userId)
    return fetch(`http://localhost:8000/api/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log("Error-UA-10-1-", err));
  };

  export const updateUserProgress = (userId, data,token) => {
    console.log("Update User API", data)
    return fetch(`http://localhost:8000/api/user/progress/${userId}`,{
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
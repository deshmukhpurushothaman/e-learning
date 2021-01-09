export const getQuizPython = () => {
    return fetch(
        `http://localhost:8000/api/quiz/courses/Python`,
        {
          method: "GET",
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          }
          
        },
        
      )
        .then((response) => {
          return response.json();
        })
        .catch((err) => console.log("Error-PO-20-2-", err));
}

export const getQuizFlutter = () => {
  return fetch(
      `http://localhost:8000/api/quiz/courses/Flutter`,
      {
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        }
        
      },
      
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log("Error-PO-20-2-", err));
}

export const getQuizDart = () => {
  return fetch(
      `http://localhost:8000/api/quiz/courses/Dart`,
      {
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        }
        
      },
      
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log("Error-PO-20-2-", err));
}

export const deleteQuiz = (quizId) => {
  console.log("Dele Quiz API")
  return fetch(`http://localhost:8000/api/quiz/${quizId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("Error-PO-20-5-", err));
}

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
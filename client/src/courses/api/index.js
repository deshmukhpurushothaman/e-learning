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
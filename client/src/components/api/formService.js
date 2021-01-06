import axios from 'axios';
const API_URL = "http://localhost:8000/api/quiz";


export default {
    getForms(userId){
        return axios
        .get(API_URL + "getuserforms/" +userId)
        .then(response =>{
            return response.data;
        })
    },

    // createForm(data){
    //     console.log(data);
    //     return axios
    //     .post(API_URL + "create", data)
    //     .then(response =>{
    //         console.log(response.data); 
    //         return response.data;
    //     })
    // },

    getForm(formId){
        return axios
        .get(API_URL + "form/"+formId)
        .then(response =>{
          //  console.log(response.data);
            return response.data;   
        })
    },

    // autoSave(data){
    //     console.log(data);
    //     return axios
    //     .put(API_URL + "/editform/", data)
    //     .then(response =>{
    //           console.log(response.data);
    //           return response.data;   
    //       })
    // },

    getQuizById  (quizId)  {
      console.log("Get Quiz By ID API",quizId)
      return fetch(`http://localhost:8000/api/quiz/${quizId}`, {
        method: "GET",
      })
        .then((response) => {
          //console.log("Recieved Data", response.json());
          return response.json();
        })
        .catch((err) => console.log("Error-PO-20-3-", err));
    },

    updateForm (quizId, data) {
      console.log(" Update API", data)
      return fetch(`http://localhost:8000/api/quiz/update/${quizId}`,{
        method: "PUT",
        headers: {
          Accept: "application/json",
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log("Error-PO-20-3-", err));
    },

    createForm (data)  {
        console.log("Create Form API ", data)
        return fetch(`${API_URL}/createquiz`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            //Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
              console.log("Create Form",response.json()); 
            return response.json();
          })
          .catch((err) => console.log("Error-PO-20-1-", err));
      },

    submitResponse(data){
        console.log(data);
        return axios
        .post(API_URL + "addresponse", data)
        .then(response =>{
            console.log(response.data); 
            return response.data;
        })
    },

    getResponse(formId){
      //  console.log(formId);
        return axios
        .get(API_URL + "getresponse/" + formId)
        .then(response =>{
           // console.log(response.data); 
            return response.data;
        })
        
    }

    
    
  };


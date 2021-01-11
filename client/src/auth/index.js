export const signUp = user => {
    //Post request for the form
    console.log("Backend url", user)
    return fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
    
    })    
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}


export const signin = user => {
    //Post request for the form
    console.log("Signin",process.env.REACT_APP_API_URL)
    return fetch(`${process.env.REACT_APP_API_URL}/api/auth/signin`, {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
    
    })    
    .then(response => {
        console.log("response")
        return response.json();
    })
    .catch(err => console.log(err));
}

export const forgotPassword = email => {
    //Post request for the form
    console.log("Forgot Password",process.env.REACT_APP_API_URL)
    return fetch(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, {
    method: "PUT",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({email})
    
    })    
    .then(response => {
        console.log("response")
        return response.json();
    })
    .catch(err => console.log(err));
}


//JWT 
export const authenticate = (jwt, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt" , JSON.stringify(jwt))
    }
    next()
}


//Signing Out User
export const signout = (next) => {
    if(typeof window !== "undefined") localStorage.removeItem("jwt")
    next()
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


//To check whether the user is logged in
export const isAuthenticated = () => {
    if(typeof window == "undefined")
    {return false}

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        return false
    }
}



// export const forgotPassword = email => {
//     console.log("email: ", email);
//     return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
//         method: "PUT",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email })
//     })
//         .then(response => {
//             console.log("forgot password response: ", response);
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };
 
export const resetPassword = resetInfo => {
    console.log("Reset Password API", resetInfo)
    return fetch(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};
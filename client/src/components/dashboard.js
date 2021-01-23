import React, { useEffect, useState } from 'react';
import "../css/dash.css";
import { getSingleUser } from "./TakeQuiz/api/index"
import { updateUserProfile } from "./api/user"
import {isAuthenticated} from "../auth"
import {Spinner} from "react-bootstrap"
import avatar from "../images/avatar.jpg";
import Menu from "../core/Menu"

const Dashboard= () => {

  const [user, setUser]= useState();

  const handleChange = (name) => (event) => {
    
    setUser({ ...user, error: "", [name]: event.target.value });
    //console.log(user)
  };

  const init = (userId) => {
    
    const token = isAuthenticated().token;
    getSingleUser(userId, token).then((data) => {
      //this.setState({ loading: false });
      if (data.error) {
        //this.setState({ redirectToSignin: true });
        console.log("error")
      } else {
        setUser({...user, ...data});
        
      }
    });
  };
  
  const updateUser = () => {
    let userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    updateUserProfile(userId, user, token).then((data) => {
      if(data.error){
        console.log(data.error)
      }
      else{
        setUser({...user, ...data})
        window.location.reload();
      }
    })
  }

  useEffect(() => {
    let userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    //console.log("User Id",userId)
    init(userId)
    // eslint-disable-next-line
  }, []);
    return (
        <div class="box">
          {user === undefined ? 
          <>
          <div  style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
          <Spinner animation="border" variant="warning" />
          </div>
          </>
          : 
          
          <div id="overlay">
            
            <div class="image">
                {/* <div class="trick">
                </div> */}
              {/* <img src={avatar}></img> */}
            </div>
              <ul class="text">{user.name}</ul>
              <div class="text1">{user.email}</div>
          
          


          <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          <div class="panel panel-default">
            <input id="email" type="text" placeholder="Name" value={user.name} onChange={handleChange("name")}/>

            </div>
            <div class="panel panel-default">
            <input id="email" type="text" placeholder="Github" value={user.github} onChange={handleChange("github")}/>

            </div>
            <div class="panel panel-default">
            <input id="name" type="text" placeholder="LinkedIn" value={user.linkedin} onChange={handleChange("linkedin")}/>
            
            
            </div>
            
 

            <button class="btn btn-danger btn-outline btn-lg upd-btn" onClick={()=>updateUser()}>UPDATE</button>


            
              
            
          </div>
        </div>
}
</div>
    )
}

export default Dashboard;

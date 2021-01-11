import React, { Component } from 'react'
import "../css/ForgotPassword.css";
import Lottie from 'react-lottie'
import animation from "../images/forgot.json";
import { forgotPassword } from '../auth/index';


class ForgotPassword extends Component {

    constructor(){
        super ()
        this.state = {
            email: "",
            
        }
    }
        
handleChange = (name) => (event) => {
    this.setState({error: ""})
    this.setState({[name]: event.target.value});
    console.log("Email", this.state.email) 
  };

  clickSubmit = event => {
    event.preventDefault();
    //this.setState({loading: true})
    const {email} = this.state
   console.log("Submitted", email)
    
    forgotPassword(email).then(data => {
        if (data.error) {
            this.setState({ error: data.error, loading: false });
        } 
        
        else{
            //Authenticate
  
            
                alert("Check your email for Password reset link")
                
            
            //Redirect
        }
    });
    
  };

    render() {
        const animationContainer = {
            loop: true,
            autoplay: true,
            animationData: animation,
          };
        return (
            <div class="forgot-cont">
        <form action="#" method="POST" class="forgot-wrap">
        <Lottie className="forgotscreen_img" options={animationContainer} style={{display: 'flex',flexDirection:'column', width: "350px", height: "250px",marginLeft:"135px", marginBottom:"10px"}}/>
            <h6><strong>Forgot Password</strong></h6>
            <div class="forgot-box">
                <input type="text" onChange={this.handleChange("email")} placeholder="Enter Email address" />
            </div>
            <div class="forgot-submit">
              <button className="forgot-send" onClick={this.clickSubmit}>Send</button>
            </div>
        </form>
    </div>
        )
    }
}

export default ForgotPassword;

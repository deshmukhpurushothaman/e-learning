import React, { Component } from 'react'
import "../css/ForgotPassword.css";
import Lottie from 'react-lottie'
import animation from "../images/forgot.json";
import { resetPassword } from '../auth/index';


class ResetPassword extends Component {

    constructor(){
        super ()
        this.state = {
            newPassword: "",
            
        }
    }
        
handleChange = (name) => (event) => {
    this.setState({error: ""})
    this.setState({[name]: event.target.value});
  };

  clickSubmit = event => {
    event.preventDefault();
    //this.setState({loading: true})
    const {newPassword} = this.state
   console.log("Submitted", newPassword)
    
   resetPassword({
    newPassword: newPassword,
    resetPasswordLink: this.props.match.params.resetPasswordToken
}).then(data => {
    if (data.error) {
        console.log(data.error);
        this.setState({ error: data.error });
    } else {
        console.log(data.message);
        this.setState({ message: data.message, newPassword: "" });
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
            <h6><strong>Reset Password</strong></h6>
            <div class="forgot-box">
                <input type="text" onChange={this.handleChange("newPassword")} placeholder="Enter New Password" />
            </div>
            <div class="forgot-submit">
              <button className="forgot-send" onClick={this.clickSubmit}>Submit</button>
            </div>
        </form>
    </div>
        )
    }
}

export default ResetPassword;

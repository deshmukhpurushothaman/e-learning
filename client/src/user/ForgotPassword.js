import React, { Component } from 'react'
import "../css/ForgotPassword.css";
import Lottie from 'react-lottie'
import animation from "../images/forgot.json";


class ForgotPassword extends Component {
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
                <input type="text" placeholder="Enter Email address" />
            </div>
            <div class="forgot-submit">
              <button className="forgot-send">Send</button>
            </div>
        </form>
    </div>
        )
    }
}

export default ForgotPassword;

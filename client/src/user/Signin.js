import React, { Component } from 'react'
import "../css/user.css";
import Lottie from 'react-lottie'
import {Redirect} from 'react-router-dom'
import { signin , authenticate} from '../auth/index';
import animation from "../images/signup.json";

class Signin extends Component {
    constructor(){
        super ()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
    }
        
handleChange = (name) => (event) => {
    this.setState({error: ""})
    this.setState({[name]: event.target.value}); 
  };
  
  clickSubmit = event => {
    event.preventDefault();
    this.setState({loading: true})
    const {email, password} = this.state
    const user = {
        email,
        password
    };
    
    signin(user).then(data => {
        if (data.error) {
            this.setState({ error: data.error, loading: false });
        } 
        
        else{
            //Authenticate
  
            authenticate(data, () => {
                this.setState({redirectToReferer: true})
            })
            //Redirect
        }
    });
    
  };
  signinForm = (email, password) => {
  
    const animationContainer = {
        loop: true,
        autoplay: true,
        animationData: animation,
      };
      
        return (
            <div class="l-form">
            <div class="shape1"></div>
            <div class="shape2"></div>
    
            <div class="form">
                <Lottie className="form__img" options={animationContainer} style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', width: "500px", height: "800px"}}/>
                <form action="" class="form__content">
                    <h1 class="form__title"><strong>Sign in</strong></h1>
    
                    <div class="form__div form__div-one">
                        <div class="form__icon">
                            <i class='bx bx-mail-send'></i>
                        </div>
    
                        <div class="form__div-input">
                            <label for="" class="form__label">Email address</label>
                            <input type="text" class="form__input" onChange={this.handleChange("email")}/>
                        </div>
                    </div>
    
                    <div class="form__div">
                        <div class="form__icon">
                            <i class='bx bx-lock' ></i>
                        </div>
    
                        <div class="form__div-input">
                            <label for="" class="form__label">Password</label>
                            <input type="password" class="form__input"onChange={this.handleChange("password")}/>
                        </div>
                    </div>
                    <a href="/ForgotPassword" class="form__forgot">Forgot Password?</a>
    
                <button class="form__button" onClick={this.clickSubmit}>Submit</button>
                    <a href="/Signup" class="form__have_acc">New user? Signup</a>
    
    
                    {/* <div class="form__social">
                        <span class="form__social-text">Our login with</span>
    
                        <a href="#" class="form__social-icon ml-3"><i class='bx bxl-github' ></i></a>
                        <a href="#" class="form__social-icon"><i class='bx bxl-google' ></i></a>
                        <a href="#" class="form__social-icon"><i class='bx bxl-facebook' ></i></a>
                    </div> */}
                </form>
            </div>
    
        </div>
        )
}
render() {
   
    const {email, password, error, redirectToReferer, loading} = this.state;

    if(redirectToReferer) {
      return <Redirect to="/" />
  }
  return (
           
    <div>
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>

        {loading ? (
            <div className="jumbotron text-center">
                <h2>Loading...</h2>
            </div>
        ) : (
            ""
        )}
    {this.signinForm(email, password)}

        
    </div>
);
  }
}


export default Signin;

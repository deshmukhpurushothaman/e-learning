import React, { Component } from 'react'
import "../css/user.css";
import Link from '@material-ui/core/Link';
import Lottie from 'react-lottie'
import { signUp } from '../auth/index'
import animation from "../images/signup.json";

class Signup extends Component {
    constructor(){
        super ()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }
      }
    
    
      handleChange = (name) => (event) => {
        this.setState({error: ""})
        this.setState({[name]: event.target.value});
      };
    
    clickSubmit = event => {
      event.preventDefault();
      const {name, email, password} = this.state
      const user = {
          name,
          email,
          password
      };
      console.log("User", user)
      signUp(user)
      .then(data => {
          if(data.error) this.setState({error: data.error})
          else 
              this.setState({
                  error: "",
                  name: "",
                  email: "",
                  password: "",
                  open: true
          });
      }
      );
      
    };
     signupForm = (name,email,password) => {
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
                    <h1 class="form__title"><strong>Sign up</strong></h1>
    
                    <div class="form__div form__div-one">
                        <div class="form__icon">
                            <i class='bx bx-user-circle'></i>
                        </div>
    
                        <div class="form__div-input">
                            <label for="" class="form__label">Username</label>
                            <input type="text" class="form__input" onChange={this.handleChange("name")}/>
                        </div>
                    </div>
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
                            <input type="password" class="form__input" onChange={this.handleChange("password")}/>
                        </div>
                    </div>
                   
                <button class="form__button" onClick={this.clickSubmit}>Submit</button>
                    <a href="/Signin" class="form__have_acc">Already have an account? Signin</a>
    
                  {/*     
                    <div class="form__social">
                        <span class="form__social-text">Our signup with</span>
    
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
                    const { name, email, password, error, open} = this.state;
                    return (
                           
                      <div>
                
                          <div
                              className="alert alert-danger"
                              style={{ display: error ? "" : "none" }}
                          >
                              {error}
                          </div>
                          
                
                          <div
                              className="alert alert-info"
                              style={{ display: open ? "" : "none" }}
                          >
                              New account is successfully created. Please <Link to="/Sigin">Signin</Link>
                          </div>
                
                
                      {this.signupForm(name, email, password)}
                
                          
                      </div>
                  );
                  }
                }
                
                
export default Signup;

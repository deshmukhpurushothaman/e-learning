import React, { Component } from 'react'
import Link from '@material-ui/core/Link';
import Menu from "../core/Menu.js";
import { Card, Image } from 'semantic-ui-react'
import python from "../images/python.png";
import flutter from "../images/flutter.png";
import dart from "../images/dart.jpg";
import comingsoon from "../images/comingsoon.png";
import { contactUs } from "./api/user"


export default class Homepage extends Component {

  constructor() {
    super()
    this.state = {
        name: "",
        email: "",
        phone: "",
        text: "",
    }
}

handleChange = name => event => {
  this.setState({ error: "" });
  
  this.setState({ [name]: event.target.value, });
  //console.log("Contact us", this.state)
};

clickSubmit = event => {
  event.preventDefault();//This will protect default reload
  //this.setState({location: true})

  // if(this.isValid()) {
      // const {name, email, password} = this.state
      // const user = {
      //     name,
      //     email,
      //     password: password || undefined
      //};
      
      // console.log(user);

      // const userId = isAuthenticated().user._id
      // const token = isAuthenticated().token

      const contact = this.state;
      //console.log("Click submit", contact)      
      contactUs(contact)
      .then(data => {
          //console.log(data)
          
          if(data.error){ 
            this.setState({error: data.error})
            alert("Message sent to the organization.");
      }else {
              this.setState({ name:"", email:"", phone:"", text: "", redirectToProfile: true})
          }
      });
    
};


    render() {
        return (
            <div className="App">
        <Menu/>
        <header className="masthead">
          <div className="container">
            <div className="intro-text">
              {/* <div className="intro-lead-in">Welcome To Our Best Enlist Learning!</div> */}
              <div className="intro-lead-in">We believe in</div>
              <div className="intro-heading">Passion for Learning</div>
              <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Let's get started</a>
            </div>
          </div>
        </header>
      
        
         <section className="page-section" id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase"><strong>Popular Courses</strong></h2>
                <h3 className="section-subheading text-muted">Build your library for your career and personal growth</h3>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <div className="box-c">
                   <div className="imgBox">
                       {/* <Link to="/python"><img src={python}/></Link> */}
                       <img src={python}/>
                   </div>
                   <a href="/python">
                    <div className="details-c">
                      <div className="content">
                      <h2>Python</h2>
                      <p>Python 30 Day's Challenge</p>
                      </div>  
                    </div>
                   </a>
                </div>
              </div>
              <div className="col-md-4">
              <div className="box-c">
                   <div className="imgBox">
                       <img src={flutter}/>
                   </div>
                   <a href="/flutter">
                   <div className="details-c">
                     <div className="content">
                     <h2>Flutter</h2>
                     <p>Flutter 30 Day's Challenge</p>
                     </div>
                   </div>
                   </a>
               </div>
              </div>
              <div className="col-md-4">
              <div className="box-c">
                   <div className="imgBox">
                       <img src={dart}/>
                   </div>
                   <a href="/dart">
                   <div className="details-c">
                     <div className="content">
                     <h2>Dart</h2>
                     <p>Dart 30 Day's Challenge</p>
                     </div>
                   </div>
                   </a>
                </div>
             </div>
            </div>
            <div className="row mt-10 text-center">
              <div className="col-md-4">
              <div className="box-c">
                   <div className="imgBox">
                       <img src={comingsoon}/>
                   </div>
                   <div className="details-c">
                     <div className="content">
                     <h2>Coming soon!!</h2>
                     </div>
                   </div>
               </div>
              </div>
              <div className="col-md-4">
              <div className="box-c">
                   <div className="imgBox">
                       <img src={comingsoon}/>
                   </div>
                   <div className="details-c">
                     <div className="content">
                     <h2>Coming soon!!</h2>
                     </div>
                   </div>
               </div>
              </div>
              <div className="col-md-4">
              <div className="box-c">
                   <div className="imgBox">
                       <img src={comingsoon}/>
                   </div>
                   <div className="details-c">
                     <div className="content">
                     <h2>Coming soon!!</h2>
                     </div>
                   </div>
               </div>
             </div>
            </div>
          </div>
        </section>
      
        
        {/* <Portfolio portfolioLinks={portfolioLinks}></Portfolio> */}


        
      
        
        {/* <section className="page-section" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Popular Courses</h2>
                <h3 className="section-subheading text-muted">Build your library for your career and personal growth</h3>
              </div>
            </div>
            
          </div>
        </section> */}
      
        
        {/* <section className="bg-light page-section" id="team">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <div className="team-member">
                  <img className="mx-auto rounded-circle" src="img/team/1.jpg" alt=""/>
                  <h4>Kay Garland</h4>
                  <p className="text-muted">Lead Designer</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="#something">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i className="fa fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="team-member">
                  <img className="mx-auto rounded-circle" src="img/team/2.jpg" alt=""/>
                  <h4>Larry Parker</h4>
                  <p className="text-muted">Lead Marketer</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="#something">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i className="fa fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="team-member">
                  <img className="mx-auto rounded-circle" src="img/team/3.jpg" alt=""/>
                  <h4>Diana Pertersen</h4>
                  <p className="text-muted">Lead Developer</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="#something">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i className="fa fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
              </div>
            </div>
          </div>
        </section>
      
        
        <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <a href="#something">
                  <img className="img-fluid d-block mx-auto" src="img/logos/envato.jpg" alt=""/>
                </a>
              </div>
              <div className="col-md-3 col-sm-6">
                <a href="#something">
                  <img className="img-fluid d-block mx-auto" src="img/logos/designmodo.jpg" alt=""/>
                </a>
              </div>
              <div className="col-md-3 col-sm-6">
                <a href="#something">
                  <img className="img-fluid d-block mx-auto" src="img/logos/themeforest.jpg" alt=""/>
                </a>
              </div>
              <div className="col-md-3 col-sm-6">
                <a href="#something">
                  <img className="img-fluid d-block mx-auto" src="img/logos/creative-market.jpg" alt=""/>
                </a>
              </div>
            </div>
          </div>
        </section> */}
      
        
        <section className="page-section" id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase mb-5">Contact Us</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <form id="contactForm" name="sentMessage" novalidate="novalidate">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input className="form-control" id="name" type="text" placeholder="Your Name *" onChange={this.handleChange("name")} required="required" data-validation-required-message="Please enter your name."/>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <input className="form-control" id="email" type="email" placeholder="Your Email *" onChange={this.handleChange("email")} required="required" data-validation-required-message="Please enter your email address."/>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <input className="form-control" id="phone" type="tel" placeholder="Your Phone *" onChange={this.handleChange("phone")} required="required" data-validation-required-message="Please enter your phone number."/>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <textarea className="form-control" id="message" placeholder="Your Message *" onChange={this.handleChange("text")} required="required" data-validation-required-message="Please enter a message."></textarea>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-lg-12 text-center">
                      <div id="success"></div>
                      <button  className="btn btn-primary btn-xl text-uppercase" onClick={this.clickSubmit} type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      
        
        <footer className="footer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                <span className="copyright">  {'Copyright © '}
      <Link color="inherit" href="http://bestenlist.co.in/">
       Best Enlist
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}</span>
              </div>
              <div className="col-md-4">
                <ul >
                  <li className="list-inline-item">
                  <a class="btn-floating btn-lg btn-fb" href="https://www.linkedin.com/company/bestenlist/"><i class="fab fa-linkedin-in"></i></a>


                  </li>
                  <li className="list-inline-item">
                   
                   <a class="btn-floating btn-lg btn-gplus"href="http://bestenlist.co.in/" ><i class="fab fa-google-plus-g"></i></a>
                  </li>
                 
                </ul>
              </div>
              <div className="col-md-4">
                <ul className="list-inline quicklinks">
                  <li className="list-inline-item">
                    <a href="#something">Privacy Policy</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">Terms of Use</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
          </div>
        )
    }
}

import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Logo from '../images/logo.png';
import {signout, isAuthenticated} from '../auth'

export default class Menu extends Component {

  

  render() {
    return (
      <div>
           <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar" id="mainNav">
          <div className="container">
            <div className="logo-name">
            <img src={Logo}width="40" height="40"  alt=""></img>
            <a className="navbar-brand js-scroll-trigger" href={`/`}>Best Enlist Learning</a>
            </div>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
             
              <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav text-uppercase ml-auto">
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger"  href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#mylearnings">My learnings</a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#tropies">Tropies</a>
                </li> */}
               
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#contact">Contact</a>
                </li>
                
                {!isAuthenticated() && (
                  <>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="/signin">Sign In</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="/signup">Signup</a>
                </li>
                </>
                )}
                {isAuthenticated() && (
                <>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Profile</a>
                    <ul class="dropdown-menu">
                      
                      <li><a class="dropdown-item" href="/dashboard">Dashboard</a></li>
                      {(isAuthenticated().user.role === 400) && <li><a class="dropdown-item" href="/admin-createpost">Create Quiz</a></li>
                      }

                      <li><a class="dropdown-item" onClick={() => signout(() => {
                                <Redirect to="/" />
                                window.location.reload();
                                })}>
                                  Signout</a></li>                      
                    </ul>
                  </li>
                </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      
      </div>
    )
  }
}

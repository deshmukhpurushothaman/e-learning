import React, { Component, useState, useEffect } from 'react'
import Menu from "../core/Menu.js";
import LockIcon from '@material-ui/icons/Lock';
import Iframe from 'react-iframe'
import { getQuizFlutter, deleteQuiz, getSingleUser } from "./api/index"
import { isAuthenticated } from "../auth/index"
import { Accordion, Card, Button, Spinner } from 'react-bootstrap'
import {Link, Redirect} from "react-router-dom"
import Lottie from 'react-lottie'
import animation from "../images/book-animation.json";

const animationContainer = {
  loop: true,
  autoplay: true,
  animationData: animation,
};


class Flutter extends React.Component {

    constructor() {
        super()
        this.state = {
            quiz: [],
            user: "",
        }
    }

    
    
    loadQuiz= async()=>{
        await getQuizFlutter().then((data) => {
            
            if (data.error) {
                console.log(data.error)
              } else {
                this.setState({ quiz: data});
                        
              }
          })    
      }
      
      init = (userId) => {
    
        const token = isAuthenticated().token;
        getSingleUser(userId, token).then((data) => {
          //this.setState({ loading: false });
          if (data.error) {
            //this.setState({ redirectToSignin: true });
            console.log(data.error)
          } else {
            this.setState({user: data})
            
          }
        });
      };

      componentDidMount(){
          this.loadQuiz();
          let userId = isAuthenticated().user._id;
          this.init(userId);
          
         
      }

      delete = (quizId) => {
        //const quizId = this.state.post._id;
        //const token = isAuthenticated().token;
        deleteQuiz(quizId).then((data) => {
          if (data.error) {
            this.setState({ error: data.error });
          } else {
            <Redirect to="/" />
          }
        });
      };
    
      deleteConfirmed = (quizId) => {
        let answer = window.confirm("Are you sure you want to delete your post?");
        if (answer) {
          this.delete(quizId);
        }
      };

      
      
    renderPage=(quiz)=>{
        var days = this.state.user.flutter +1; // +1 is to display the next days task
        console.log("Render Page", quiz)
        var disable = "false";
        var admin = false;
        if(this.state.user.role === 400){
           admin = true;
        }
        return (
            <div className="App">
            <Menu />
            <section className="page-section" id="services">
            <div className="row mt-5 task-py">
            
            <div className="col">
            <Lottie options={animationContainer} style={{display: 'flex',flexDirection:'column', width: "750px", height: "470px",marginRight: "-120px"}}/>
            </div>
            <div className="col">
            <h1><strong>Welcome to Flutter course!!</strong></h1>
                    {quiz.map((quizzes, i)=>{
                     
                        var con = days<quizzes.day? "": i+1;
                        return(
                          <div className="task-box">

<Accordion defaultActiveKey="0">
{console.log("Mapping ", i, con)}
 <Card className="accordion-header">
    <Card.Header>
      <Accordion.Toggle as={Button}  variant="link" eventKey={`${con}`} >
        Day {quizzes.day} {con === "" && (<LockIcon />)}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={`${con}`}>
      <Card.Body>
      <iframe width="800" height="315" src={`${quizzes.link}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <br />
                                    <Link to={`/flutter/${i+1}/${quizzes._id}`} className="btn btn-success">Take Quiz</Link>
                                    {isAuthenticated() && admin && (
                                    <>
                                    <button className="btn btn-danger" onClick={()=>this.deleteConfirmed(quizzes._id)}>Delete Task</button>
                                    <Link to={`/edit/flutter/${i+1}/${quizzes._id}`} className="btn btn-primary">Edit Task/Quiz</Link>
                                    </>
                                    )}
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
                        {console.log("User Logged in", this.state.user)}
                
                        </div>
                 );})}
                     
                     
                
                    <br />
                
                
                
              


                    
                
           
            </div>
            
            
        </div> 
        </section>
    </div>
            )
        
    }
    render() {

        const {quiz} = this.state
        return(
            <div className="container">
                 {/* <h2 className="mt-5 mb-5"> */}
                    {!quiz.length  ? 
                    
                    "Loading..."                    
                    
                   : this.renderPage(quiz)}
                     {/* </h2> */}

                {/* {this.renderPage(quiz)} */}
            </div>
        )
    }
}

    export default Flutter;
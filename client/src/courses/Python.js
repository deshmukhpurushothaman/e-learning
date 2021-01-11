import React, { Component, useState, useEffect } from 'react'
import Menu from "../core/Menu.js";
import LockIcon from '@material-ui/icons/Lock';
import { getQuizPython, deleteQuiz, getSingleUser } from "./api/index"
import { isAuthenticated } from "../auth/index"
import { Accordion, Card, Button, Spinner } from 'react-bootstrap'
import {Link, Redirect} from "react-router-dom"
import "../css/mylearnings.css";

class Python extends React.Component {

    constructor() {
        super()
        this.state = {
            quiz: [],
            user: "",
        }
    }

    
    
    loadQuiz= async()=>{
        await getQuizPython().then((data) => {
            
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
            console.log("User", data)
            
          }
        });
      };

      componentDidMount(){
          this.loadQuiz();
          let userId = isAuthenticated().user._id;
          console.log("User id", userId)
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
        var days = this.state.user.python +1; // +1 is to display the next days task
        console.log("Render Page", quiz)
        console.log("User Detaisl", this.state.user)
        var disable = "false";
        var admin = false;
        if(this.state.user.role === 400){
           admin = true;
        }
        return (
            <div className="App">
            <Menu />
            <section className="page-section" id="services">
            <div className="row">
            
            <div className="col-md-2">
            </div>
            <div className="col-md-8">
            
                
                {/* <div class="accordion" id="accordionExample" >
                
                    
                    <div class="accordion-item" > */}
                    {quiz.map((quizzes, i)=>{
                        
                        // {if(days<i)
                        //   disable = "true";
                        //   else
                        //   disable = "false";
                        // }
                        var con = days<quizzes.day? "": i+1;
                        return(
               <>

                        <Accordion defaultActiveKey="0">
                        {console.log("Mapping ", i, con)}
                        <Card className="accordion-header">
                            <Card.Header >
                              <Accordion.Toggle as={Button}  variant="link" eventKey={`${con}`} >
                                Day {quizzes.day} {con === "" && (<LockIcon />)}
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={`${con}`}>
                              <Card.Body>
                              <iframe width="700" height="400" src={`${quizzes.link}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                            <br />
                                                            <button><Link to={`/python/${i+1}/${quizzes._id}`}>Take Quiz</Link></button>
                                                            {isAuthenticated() && admin && (
                                                            <>
                                                            <Button onClick={()=>this.deleteConfirmed(quizzes._id)}>Delete Task</Button>
                                                            <button><Link to={`/edit/python/${i+1}/${quizzes._id}`}>Edit Task/Quiz</Link></button>
                                                            </>
                                                            )}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                                                
                                        
                                                </>
                                        );})}                
                    <br />           
            </div>      
        </div> 
        </section>
    </div>
            )
        
    }
    render() {

        const {quiz, user} = this.state
        return(
            <div className="container">
                 {/* <h2 className="mt-5 mb-5"> */}
                    {(!quiz.length) && (!user.length)  ? 
                    
                    "Loading..."                    
                    
                   : this.renderPage(quiz)}
                     {/* </h2> */}

                {/* {this.renderPage(quiz)} */}
            </div>
        )
    }
}

    export default Python;
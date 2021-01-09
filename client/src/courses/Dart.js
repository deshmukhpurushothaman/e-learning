import React, { Component, useState, useEffect } from 'react'
import Menu from "../core/Menu.js";
import LockIcon from '@material-ui/icons/Lock';
import Iframe from 'react-iframe'
import { getQuizDart, deleteQuiz, getSingleUser } from "./api/index"
import { isAuthenticated } from "../auth/index"
import { Accordion, Card, Button, Spinner } from 'react-bootstrap'
import {Link, Redirect} from "react-router-dom"

class Dart extends React.Component {

    constructor() {
        super()
        this.state = {
            quiz: [],
            user: "",
        }
    }

    
    
    loadQuiz= async()=>{
        await getQuizDart().then((data) => {
            
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
        var days = this.state.user.dart +1; // +1 is to display the next days task
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
 <Card>
    <Card.Header>
      <Accordion.Toggle as={Button}  variant="link" eventKey={`${con}`} >
        Day {quizzes.day} {con === "" && (<LockIcon />)}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={`${con}`}>
      <Card.Body>
      <iframe width="800" height="315" src={`${quizzes.link}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <br />
                                    <button><Link to={`/dart/${i+1}/${quizzes._id}`}>Take Quiz</Link></button>
                                    {isAuthenticated() && admin && (
                                    <>
                                    <Button onClick={()=>this.deleteConfirmed(quizzes._id)}>Delete Task</Button>
                                    <button><Link to={`/edit/dart/${i+1}/${quizzes._id}`}>Edit Task/Quiz</Link></button>
                                    </>
                                    )}
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
                        {console.log("User Logged in", this.state.user)}
                
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

    export default Dart;
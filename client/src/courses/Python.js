import React, { Component, useState, useEffect } from 'react'
import Menu from "../core/Menu.js";
import LockIcon from '@material-ui/icons/Lock';
import Iframe from 'react-iframe'
import { getQuizPython } from "./api/index"
import { Accordion, Card, Button } from 'react-bootstrap'
import {Link} from "react-router-dom"

class Python extends React.Component {

    constructor() {
        super()
        this.state = {
            quiz: []
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
          console.log("Quiz",this.state.quiz)          
      }
      
      componentDidMount(){
          this.loadQuiz();
      }

      
    renderPage=(quiz)=>{
        var days = 0;
        console.log("Render Page", quiz)
        var disable = "false";
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
                        var con = days<i? "": i;
                        return(
               <>

<Accordion defaultActiveKey="0">
{console.log("Mapping ", i, con)}
 <Card>
    <Card.Header>
      <Accordion.Toggle as={Button}  variant="link" eventKey={`${con}`} >
        Day {i+1} {con === "" && (<LockIcon />)}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={`${con}`}>
      <Card.Body>
      <iframe width="800" height="315" src={`${quizzes.link}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <br />
                                    <button><Link to={`/python/${i+1}/${quizzes._id}`}>Take Quiz</Link></button>

      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
                        {/* <h2 class="accordion-header" id="headingOne" key={i}>
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                Day #{i+1}
                            </button>
                        </h2>
                            
                        <div id="collapseOne" class={`accordion-collapse collapse ${collapse}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                        
                                <iframe width="560" height="315" src={`${quizzes.link}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <br />
                                    <button><a href="/python/2/quiz">Take Quiz</a></button>
                            </div>
                
                
                        </div> */}
                
                        </>
                 );})}
                     {/* </div> */}
                     
                
                    <br />
                
                
                
              


                    {/* <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Day #1
                        </button>
                        </h2>
                        
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            
                            <iframe width="900" height="315"
                                src="https://www.youtube.com/embed/tgbNymZ7vqY">
                            </iframe>
                            <br />
                            <button onClick={this.loadQuiz}>Take Quiz</button>
                        </div>
                        </div>
                    </div>
                    <br />
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Day #2 {days>1 == false && (<LockIcon />)}
                        </button>
                        </h2>
                        {days>1 == true && (
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                        )}
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Day #3 {days>2 == false && (<LockIcon />)}
                        </button>
                        </h2>
                        {days>2 == true && (
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                        )}
                    </div> */}
                 
                {/* </div> */}
                
           
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
                    {!quiz.length  ? "Loading..." : this.renderPage(quiz)}
                     {/* </h2> */}

                {/* {this.renderPage(quiz)} */}
            </div>
        )
    }
}

    export default Python;
import React from 'react';
import Menu from "../../core/Menu";
import "../../css/takequiz.css";
import Lottie from 'react-lottie'
import animation from "../../images/start-book.json";

import { Paper, Typography } from '@material-ui/core';


const animationContainer = {
  loop: true,
  autoplay: true,
  animationData: animation,
};

const Start = ({ onQuizStart, props }) => {
  
  return(
    <div className="start-dg">
    
     <Menu/>

  
    <div className="card start-box">
        <div className="start-content">
          {props === undefined
            ? <div><h3>Loading....</h3></div> :
            <>
                 <h1><strong>Start Quiz</strong></h1>
                               <div className="start-book">
                                 <Lottie options={animationContainer} style={{ width: "400px", height: "380px"}}/>
                               </div>      
                                 <p>{"Day : " +  `${props.day}`}</p>
                                   <p>{"Course Name : " + `${props.course}`}</p>
          
                                         <p>Good luck!</p>
                                         <button className="btn btn-primary" onClick={onQuizStart}>Start</button>                       
         
           </>
          }
        </div>
      
    </div>
    
  </div>
  );
}

export default Start;
import React from 'react';

import { Paper, Typography } from '@material-ui/core';

const Start = ({ onQuizStart, props }) => {
  
  return(

    <div className="card">
      <div className="card-content">
        <div className="content">
          {props === undefined
            ? <div><p>Loading</p></div> :
            <>
          <h1>Start the quiz</h1>
          <Typography>{"Day:" +  `${props.day}`}</Typography>
          <Typography>{"Course Name:" + `${props.course}`}</Typography>
          
          <p>Good luck!</p>
          <button className="button is-info is-medium" onClick={onQuizStart}>Start</button>
          </>
          }
        </div>
      </div>
    </div>
    
  
  );
}

export default Start;
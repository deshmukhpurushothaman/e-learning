import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../auth';
import { getSingleUser } from "./api/index"

import { formatTime } from "./utils/index";

const End = ({ results, data, onReset, onAnswersCheck, time }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [user, setUser]= useState();


  const init = (userId) => {
    
    const token = isAuthenticated().token;
    getSingleUser(userId, token).then((data) => {
      //this.setState({ loading: false });
      if (data.error) {
        //this.setState({ redirectToSignin: true });
        console.log(data.error)
      } else {
        setUser({...user, ...data});
        
      }
    });
  };

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if(result.a === data[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
    let userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    console.log("User Id",userId)
    init(userId)
    // eslint-disable-next-line
  }, []);

  return(
    <div className="card">
      {user === undefined ? "Loading":
      <div className="card-content">
        <div className="content">
          <h3>Your results</h3>
          <p>{correctAnswers} of {data.length}</p>
          <p><strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong></p>
          <p><strong>Your time:</strong> {formatTime(time)}</p>
          {/* <button className="button is-info mr-2" onClick={onAnswersCheck}>Check your answers</button> */}
          <button className="button is-success" onClick={onReset}>Try again</button>
        </div>
      </div>
}
    </div>
  );
}

export default End;
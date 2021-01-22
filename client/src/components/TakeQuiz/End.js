import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom"
import { isAuthenticated } from '../../auth';
import { getSingleUser, updateUserProgress } from "./api/index"
import Menu from "../../core/Menu";
import Lottie from 'react-lottie'
import animation from "../../images/success.json";
import { formatTime } from "./utils/index";

const End = ({ results, data, onReset, onAnswersCheck, time }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [user, setUser]= useState();
  const animationContainer = {
    loop: true,
    autoplay: true,
    animationData: animation,
  };
  

const {course, day} = useParams();
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
    //console.log("User Id",userId)
    init(userId)
    // eslint-disable-next-line
  }, []);

  const setProgress=()=>{
    var score = Math.floor((correctAnswers / data.length) * 100)
    var j=0;
    if(score>=90){
      //j=j+1;
      //console.log("Score is 90", score , course, day, j)
    if(course === "python"){
      //console.log("Inside Python")
      user.python = parseInt(day);
    }
    else if(course === "flutter"){
      user.flutter = parseInt(day);
    }
    else{
      user.dart = parseInt(day);
    }
    let userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    if(j===0){
      j=j+1;
      //console.log("Inside j===0")
    updateUserProgress(userId, user, token).then((data)=>{
      if(data.error){
        //console.log("Eroorr")
        console.log(data.error)
      }
      else{
        //console.log("User Updated")
        setUser({...user, ...data})
      }
    })}
  }
};


  return(
//     <div>
//        <Menu/>

//     <div className="card">
//       {user === undefined ? "Loading":
//       <div className="card-content">{console.log("User", user)}
//         <div className="content">
//           <h3>Your results</h3>
//           <p>{correctAnswers} of {data.length}</p>
//           <p><strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong></p>
          
//           {setProgress()}
//           <p><strong>Your time:</strong> {formatTime(time)}</p>
//           <button className="btn btn-primary" onClick={onReset}><i class="fa">&#xf021;</i><span>  </span>Try again</button>
//         </div>
//       </div>
// }
//     </div>
//     </div>

<div className="start-dg">
    
<Menu/>


<div className="card start-box">

   <div className="start-content">
     {user === undefined ?
     <div><h3>Loading....</h3></div> :
       <>
            <h2><strong>Your results</strong></h2>
                          <div className="start-book">
                            <Lottie options={animationContainer} style={{ width: "380px", height: "280px", marginBottom: "70px", marginTop: "70px", marginLeft: "10px"}}/>
                          </div>      
                            <p>{correctAnswers} of {data.length}</p>
                              <p>{Math.floor((correctAnswers / data.length) * 100)}%</p>
                              {setProgress()}
     
                              <p><strong>Your time taken: </strong> {formatTime(time)}</p>
                              <button className="btn btn-primary" onClick={onReset}><i class="fa">&#xf021;</i><span>  </span>Try again</button>                      
    
      </>
     }
   </div>

</div>

</div>
  );
}

export default End;
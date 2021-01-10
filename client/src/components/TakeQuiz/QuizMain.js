import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {getQuizById} from "./api/index"

import Start from "./Start";
import Question from "./Question";
import End from "./End";
import Modal from "./Modal";
import quizData from "./data/quiz.json";
import "./utils/index";
// import 'bulma/css/bulma.min.css';
import "../../App.css"

let interval;

const QuizMain=()=> {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
  const [quiz, setQuiz] = useState();


  // componentDidMount=()=>{
  //   const quizId = this.props.match.params.quizId
  //   console.log("Quiz ID", quizId)
  // }
  const {quizId} = useParams()
  //console.log("Quiz ID", quizId)

  
  const fetchSingleQuiz = (quizId) => {
    getQuizById(quizId).then((data) => {
      if (data.error) {
        setQuiz({ ...quiz, error: data.error });
      } else {
        setQuiz({ ...quiz, ...data });
                
      }
    });
    
  };

  
  
  
  useEffect(() => {
    if(step === 3) {
      clearInterval(interval);
    }
    //const quizId = this.props.match.params.quizId
    fetchSingleQuiz(quizId)
    
  }, [step]);

  useEffect(()=>{
    fetchSingleQuiz(quizId);    
  },[])


  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    
  }
  


  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  return (
     
    <div className="QuizMain">
     
    
      
      {step === 1 &&   <Start onQuizStart={quizStartHandler} props={quiz}/>}
      {step === 2 && 
      
      <Question 
        // data={quizData.data[activeQuestion]}
        
        data= {quiz.questions[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={quiz.questions.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
      />
}
      {step === 3 && <End 
        results={answers}
        //data={quizData.data}
        data= {quiz.questions}
        onReset={resetClickHandler}
        onAnswersCheck={() => setShowModal(true)}
        time={time}
      />}

      {showModal && <Modal 
        onClose={() => setShowModal(false)}
        results={answers}
        //data={quizData.data}
        data={quiz.questions}
      />}
    </div>
  );
}
export default QuizMain;

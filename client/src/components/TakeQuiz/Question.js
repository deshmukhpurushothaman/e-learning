import React, { useState, useEffect, useRef } from 'react';
import Menu from "../../core/Menu";
import Lottie from 'react-lottie'
import animation from "../../images/quiz-takequiz.json";

const Question = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();

  const animationContainer = {
    loop: true,
    autoplay: true,
    animationData: animation,
  };
  
  

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if(findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if(error) {
      setError('');
    }
  }
  
  const nextClickHandler = (e) => {
  
    onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
    setSelected('');
    if(activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    }else {
      onSetStep(3);
    }
  }
  const previousClickHandler =(e)=> {
      if(activeQuestion <=numberOfQuestions){
          setSelected(selected);
          onSetActiveQuestion(activeQuestion -1);
      }
  }

  return(
     <div> 
        {/* <Menu/> */}

  <div class="card_section">
  <div class="container">
    <div className="row">
      <div className="col im-quiz">
      <Lottie options={animationContainer} style={{ width: "700px", height: "550px"}}/>
      </div>
      <div className="col">

      <div class="row">
        <div class="card_container-q">
          <div class="text-center card_details">
          <h3><strong>{data.questionText}</strong></h3>
          </div>
        </div>
      </div>
      {/* {data.questionText} */}
      <div class="row">
        <div class="card_container">
          <div class="text-center card_details">
          <div className="control" ref={radiosWrapper}>
            {data.options.map((choice, i) => (
         
              <div>
              <label class="takequiz-radio" key={i}>
                <strong>{choice.optionText}</strong>
              <input type="radio" name="answer" value={choice.optionText} onChange={changeHandler}/>
              <span class="checkmark"></span>
            </label>
            </div>
            
            ))}
          </div>
          {error && <div className="has-text-danger">{error}</div>}
          <button className="btn btn-primary next" onClick={nextClickHandler}>Next &raquo;</button>
                
          </div>
        </div>
      </div>
    </div>
   
        </div>
      </div>    
      </div>
    </div>
 
   
   
  );
}

export default Question;
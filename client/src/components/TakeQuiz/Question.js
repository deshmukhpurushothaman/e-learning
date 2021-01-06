import React, { useState, useEffect, useRef } from 'react';
// import Flipclock from "react-simple-flipclock";

const Question = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();

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
    // if(selected === '') {
    //   return setError('Please select one option!');
    // }
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
        <div className="timer">
          {/* <Flipclock 
        seconds={2*60} 
        dark={true} 
        fontSize={30} 
    /> */}
    </div>
    <div className="card">
         
      <div className="card-content">
        <div className="content">
          <h2 className="mb-5">{data.questionText}</h2>
          <div className="control" ref={radiosWrapper}>
            {data.options.map((choice, i) => (
              <label className="radio has-background-light" key={i}>
                <input type="radio" name="answer" value={choice.optionText} onChange={changeHandler} />
                {choice.optionText}
              </label>
            ))}
          </div>
          {error && <div className="has-text-danger">{error}</div>}
          
              <div className="row">
                  <div className="column">
                  <button className="button is-link is-medium is-fullwidth mt-4" onClick={previousClickHandler}>PREVIOUS</button>
                  </div>
                  <div className="column">
                  <button className="button is-link is-medium is-fullwidth mt-4" onClick={nextClickHandler}>Next</button>
                  </div>
              </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Question;
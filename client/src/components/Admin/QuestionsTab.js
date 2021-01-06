import React from 'react'
//import QuestionHeader from './QuestionHeader-trash';
import {Grid} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import ShareIcon from '@material-ui/icons/Share';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import formService from '../api/formService';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import lottie from 'lottie-web'
import animation from "../../images/quiz.json";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    
    minWidth: 120,
    width: "350px",
  
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function QuestionsTab(props) {

  const [questions, setQuestions]= React.useState([]);
  const [formData, setFormData] = React.useState({
    course: "",
    day: "",
    question: "",
  });
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [loadingFormData, setLoadingFormData] = React.useState(true);
  const [openOfAlert, setOpenOfAlert] = React.useState(false);

  const classes = useStyles();
  const [Tool, setTool] = React.useState('');

  const handleChange = (name) => (event) => {
    
    setFormData({ ...formData, error: "", [name]: event.target.value });
    console.log(formData)
  };

  const clipToClipboard = ()=>{
    navigator.clipboard.writeText(window.location.origin + "/createquiz")
    handleClickOfAlert();
    handleClose();
  }

  const handleClickOfAlert = () => {
    setOpenOfAlert(true);
  };

  const handleCloseOfAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenOfAlert(false);
  };


  function sendForm(){
    handleClickOpen(); 
  }

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    
  

  let animationContainer = React.createRef()

  React.useEffect(()=>{
   const anim = lottie.loadAnimation({
     container: animationContainer.current,
     //path: {animation}
     animationData: animation,
     loop: true
   })
  },[]);

  React.useEffect(()=>{
    
    if(props.formData.questions !== undefined){
      //console.log(props.formData.questions.length);
      if(props.formData.questions.length === 0){
        setQuestions([{questionText: "Question", options : [{optionText: "Option 1"}], open: false}]);
      } else{
        setQuestions(props.formData.questions)
      }
      setLoadingFormData(false)
    } 
    setFormData(props.formData)
  }, [props.formData])
  

  function saveQuestions(){
    console.log("auto saving questions initiated");
    var data = {
      course: formData.course,
      day: formData.day,
      question: questions
    }
    console.log(data);
   formService.createForm(data)
    .then((result) => {     
         console.log(result);
         setQuestions(result.questions)
        },
        error => {
        const resMessage =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(resMessage);
        }
    );
  
    
  }



  function addMoreQuestionField(){
      expandCloseAll(); //I AM GOD

      setQuestions(questions=> [...questions, {questionText: "Question", options : [{optionText: "Option 1"}], open: true}]);
  }

  function copyQuestion(i){
    let qs = [...questions]; 
    expandCloseAll();
    const myNewOptions = [];
    qs[i].options.forEach(opn => {
      if ((opn.optionImage !== undefined)||(opn.optionImage !=="")) {
        var opn1new = {
          optionText : opn.optionText,
          optionImage: opn.optionImage
        }
      } else{
        var opn1new = {
          optionText : opn.optionText
        }
      }
      myNewOptions.push(opn1new)
    });
    const qImage = qs[i].questionImage || "";
    var newQuestion = {questionText: qs[i].questionText, questionImage : qImage ,options:myNewOptions, open: true}
     setQuestions(questions=> [...questions, newQuestion]); 
  }

  


  

  

  function deleteQuestion(i){
    let qs = [...questions]; 
    if(questions.length > 1){
      qs.splice(i, 1);
    }
    setQuestions(qs)
  }

  function handleOptionValue(text,i, j){
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    //newMembersEmail[i]= email;
      setQuestions(optionsOfQuestion);
      console.log(questions)
  }

  function handleAnswerValue(text, i){
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].answer = text;
      setQuestions(optionsOfQuestion);
      console.log(questions)
  }

  function handleQuestionValue(text, i){
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
      setQuestions(optionsOfQuestion);
      console.log(questions)
  }

 function onDragEnd(result) {
  if (!result.destination) {
    return;
  }
  var itemgg = [...questions];

  const itemF = reorder(
    itemgg,
    result.source.index,
    result.destination.index
  );

  setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function showAsQuestion(i){
    let qs = [...questions];  
     qs[i].open = false;
     setQuestions(qs);
  }

  function addOption(i){
    var optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].options.length < 5){
      optionsOfQuestion[i].options.push({optionText: "Option " + (optionsOfQuestion[i].options.length + 1)})
    } else{
      console.log("Max  5 options ");  
    }
    //console.log(optionsOfQuestion);
    setQuestions(optionsOfQuestion)
  }

  function removeOption(i, j){
    var optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].options.length > 1){
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion)
      console.log(i + "__" + j);
    }   
  }

  function expandCloseAll(){
    let qs = [...questions]; 
     for (let j = 0; j < qs.length; j++) {  
      qs[j].open = false;
     }
     setQuestions(qs);
  }

  function handleExpand(i){
    let qs = [...questions]; 
    for (let j = 0; j < qs.length; j++) {
      if(i ===j ){
        qs[i].open = true;
 
      } else{
        qs[j].open = false;
       }
    }
     setQuestions(qs);
  }

  function questionsUI(){
    return  questions.map((ques, i)=> (
      <Draggable key={i} draggableId={i + 'id'} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
          <div style={{marginBottom: "15px"}}>
            <div style={{width:'100%', marginBottom: '-5px', marginLeft: "50%" }}>
              <DragIndicatorIcon style={{transform: "rotate(-90deg)", color:'#DAE0E2'}} fontSize="small"/>
            </div>
          
            <Accordion onChange={()=>{handleExpand(i)}} expanded={questions[i].open}>
              <AccordionSummary            
                aria-controls="panel1a-content"
                id="panel1a-header"
                elevation={1} style={{width:'100%'}}
              >
                { !questions[i].open ? (
              <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '3px', paddingTop: '15px', paddingBottom: '15px'}}>
                {/* <TextField id="standard-basic" label=" " value="Question" InputProps={{ disableUnderline: true }} />  */}
                
                <Typography variant="subtitle1" style={{marginLeft: '10px'}}>{i+1}.  {ques.questionText}</Typography>


                
                
                {ques.options.map((op, j)=>(
                 
                 <div key={j}>
                   <div style={{display: 'flex'}}>
                    <FormControlLabel disabled control={<Radio style={{marginRight: '3px', }} />} label={
                        <Typography style={{color: '#555555'}}>
                          {ques.options[j].optionText}
                        </Typography>
                      } />
                   </div>

                  <div>
                    
                  </div>
                 </div>
                ))}  
              </div>            
              ): ""}   
              </AccordionSummary>

              <AccordionDetails>
              <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', marginTop:'-15px'}}>
                <div style={{display:'flex', width: '100%', justifyContent: 'space-between'}}>
                  <Typography style={{marginTop:'20px'}}>{i+1}.</Typography>
                  <TextField 
                        fullWidth={true} 
                        placeholder="Question Text" 
                        style={{marginBottom: '18px'}}  
                        rows={2}
                        rowsMax={20}
                        multiline={true}

                        value={ques.questionText}
                        variant="filled"
                      onChange={(e)=>{handleQuestionValue(e.target.value, i)}}
                  />
                
                </div>

               
                
                <div style={{width: '100%'}}>
                {ques.options.map((op, j)=>(
                 
                 <div key={j}>
                      <div  style={{display:'flex', flexDirection:'row', marginLeft:'-12.5px', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px'}}>

                          <Radio disabled /> 
                          <TextField 
                            fullWidth={true} 
                            placeholder="Option text" 
                            style={{marginTop: '5px'}} 
                            value={ques.options[j].optionText}
                            onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}
                          />

                          

                          <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
                            <CloseIcon />
                          </IconButton>
                          </div>

                          
                 </div>
                ))}  
                </div>  
                
                
                {ques.options.length < 5 ? (
                  <div>
                  <FormControlLabel disabled control={<Radio />} label={
                    <Button size="small" onClick={()=>{addOption(i)}} style={{textTransform: 'none', marginLeft:"-5px"}}>
                      Add Option
                    </Button>
                  } /> 
                  </div>
                ): ""}
             <TextField marginLeft="20px" className="admin-header-box" id="outlined-basic" label="Correct answer" variant="outlined" flexItem
             onChange={(e)=>{handleAnswerValue(e.target.value, i)}}
             />
                <br></br>
                <br></br>

                <Typography variant="body2" style={{color: 'grey'}}>You can add maximum 5 options. If you want to add more then change in settings. Multiple choice single option is availible</Typography>
              </div>
              </AccordionDetails>

              <Divider />
               
              <AccordionActions>               
                    <IconButton aria-label="View" onClick={()=>{showAsQuestion(i)}}>
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton aria-label="Copy" onClick={()=>{copyQuestion(i)}}>
                      <FilterNoneIcon />
                    </IconButton>
                    <Divider orientation="vertical" flexItem/>

                    <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                      <DeleteOutlineIcon />
                    </IconButton>

                    {/* <IconButton aria-label="Image">
                      <MoreVertIcon />
                    </IconButton> */}
              </AccordionActions> 
            </Accordion>
          </div>
      </div>
                    </div>
                  )}
      </Draggable>
      
     )
    )
  }




  return (
       <div style={{marginTop:'85px', marginBottom: '7px', paddingBottom:"30px"}}>
         <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              
            >
              <DialogTitle id="alert-dialog-title">{"Copy and share link."}</DialogTitle>
              <DialogContent>
              <Paper className={classes.paper}>
                  <Grid container alignContent="space-between" alignItems="center">
                      <Grid item>
                          <Typography variant="body1">{window.location.origin + "/createquiz"}</Typography>
                          
                      </Grid>
                      <Grid item>
                          <IconButton className={classes.button} aria-label="Add" size="medium" onClick={clipToClipboard} ><FilterNoneIcon /></IconButton>
                      </Grid>
                  </Grid>
              </Paper>
                
                  
                <DialogContentText id="alert-dialog-description">
                  
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                   Cancel
                </Button>
                
              </DialogActions>
            </Dialog>
           <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            >
              {/* {loadingFormData ? (<CircularProgress />):""} */}
              
              <h1 className="admin-create-quiz-title"><strong>Create Quiz</strong></h1>
              
             <Grid item xs={12} sm={7} style={{width: '100%'}}>
                 
                  <Grid style={{border: '10px solid teal', borderRadius: 10}}>
                      <div>
                          <div>
                            <Paper elevation={2} style={{width:'100%'}}>
                              <div className="row">
                                <div className="column">
                                     <div className="animation-container" ref={animationContainer} style={{display: 'flex',flexDirection:'column', alignItems:'flex-start',paddingTop: '20px', paddingBottom: '20px', width: '800px'}}/>
                                </div>
                                  <div className="column" marginLeft="-100px">
                                   <div style={{display: 'flex',flexDirection:'column', alignItems: "flex-end", marginTop: '-195px',paddingBottom: '20px', width: '800px'}}>
                                   <FormControl variant="outlined" className={classes.formControl} onChange={handleChange("course")}>
                                       <InputLabel id="demo-simple-select-outlined-label">Course</InputLabel>
                                          <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                          // value={Tool}
                                             onChange={handleChange("course")}
                                            label="Course"
                                            
                                           
                    
                                    >
                                      
                                   <MenuItem value={"Python"}>Python</MenuItem>
                                   <MenuItem value={"Flutter"}>Flutter</MenuItem>
                                   <MenuItem value={"Dart"}>Dart</MenuItem>
                                   </Select>
                                   </FormControl> 
                                   
         
                                   </div>
                                   <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-end',paddingBottom: '40px'}}>
                                   <TextField className="admin-header-box" id="outlined-basic" label="Day" variant="outlined" flexItem onChange={handleChange("day")}/>
                                  </div>
                                </div>
                              </div>

                            </Paper>
                          </div> 
                      </div>       
                  </Grid>  


                  <Grid style={{paddingTop: '10px'}}>
                    <div>
                   

                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {questionsUI()}

                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <div>                       
                        <Button
                          variant="contained"
                          
                          onClick={addMoreQuestionField}
                          endIcon={<AddCircleIcon />}
                          style={{margin: '5px'}}
                        >Add Question </Button>

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={saveQuestions}
                          style={{margin: '15px'}}
                          endIcon={<SaveIcon />}
                        >Save Questions </Button>
                      </div>
                    </div>
                  </Grid>        
              </Grid>           
           </Grid>
       </div>
  );
}
export default QuestionsTab

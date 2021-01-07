const FormModel = require('../models/Form')
//const ResponseModel = require('../db/Response')
const jwt = require('jsonwebtoken');


module.exports = {
    // formsGet : async(req,res)=>{
    //     try{
    //         var result = await FormModel.find().lean();
    //         res.send(result);     
    //     }catch(e){
    //         res.send(e);
    //     }
    // },

    getQuiz: async (req,res)=>{
        courseName = req.params.course;
        const quiz = await FormModel.find({course: courseName})
        .sort({day: 1})
        .then((quiz) => {
            console.log("Quiz By ID",quiz)
            res.status(200).json(quiz);
          })
          .catch((err) => {
            // console.log(err);
            return res.status(400).json({ error: err });
          });
    },

    getQuizById : async(req,res)=>{
        
        quizId = req.params.quizId;
        //console.log("Get Quiz By ID", quizId)
        const quiz = await FormModel.findById(quizId)
        .then((quiz) => {
            console.log("Quiz By ID",quiz)
            res.status(200).json(quiz);
          })
          .catch((err) => {
            // console.log(err);
            return res.status(400).json({ error: err });
          });
    },

    createForm: async(req,res)=>{     
        try {

            // let form = new formidable.IncomingForm();
            // form.keepExtensions = true;

            // form.parse(req, async (err, fields, files) => {
            //     if (err) {
            //     return res.status(400).json({
            //         error: "Issue in parsing Input",
            //     });
            //     }
            console.log("Data", req.body)
            var data = {
                course: req.body.course,
                day: req.body.day,
                link: req.body.link,
                questions: req.body.question
            }
             console.log("Create form hit", data)

            var newForm = new FormModel(data)
            await newForm.save().then((docs)=>{
                 console.log("Saved Form")
                // UserModel.updateOne(
                //     {_id: data.createdBy },
                //     { $push: { createdForms: docs._id}})
                //     .then(()=>{
                //     console.log("Form id added to user deeatils");
                // })
                // .catch(error => console.log("got some error"))  
                // res.status(200).json(
                //     docs
                // );
            })
            console.log("Form created")

        } catch (error) {
            res.send(error)
        }
    },

    updateQuiz : async(req, res)=>{
        quizId = req.params.quizId;
        console.log("Quiz Id Update", quizId)
        try {
            console.log("Update Bidy", req.body)
            var data = {
                course: req.body.course,
                day: req.body.day,
                link: req.body.link,
                questions: req.body.question
            }
            
            console.log("Data", data)

            // form.save((err, result) => {
            //     if (err) {
            //         console.log("Error", err)
            //       return res.status(400).json({
            //         error: err,
            //       });
            //     }
            //     console.log("Successfull", result)
            //     res.json(result);
            //   });

            // FormModel.findOneAndUpdate({})
            

            FormModel.findOneAndUpdate( { _id: quizId }, data ,{new: true} ,(err, result)=>{
                console.log("Find Model Method")
                if(err){
                    console.log("Error in Updating")
                    res.status(500).send(err)
                }
                else{
                    console.log("Update Method", result)
                    res.status(200).json(result)
                }
            });
            // FormModel.find( {_id: quizId}, (err, result)=>{
            //     console.log("Find Model Method")
            //     if(err){
            //         console.log("Error in Updating")
            //         res.status(500).send(err)
            //     }
            //     else{
            //         console.log("Find Method", result)
            //         res.status(200).json(result)
            //     }
            // });
           
        } catch (error) {
            res.send(error)
        }
    },


    deleteQuiz: (req, res)=>{

        try {
            var quizId = req.params.quizId;
            //var userId = req.params.userId;

            console.log("QuizId",quizId);
            //console.log(userId);

            FormModel.findOne({_id: quizId}).then(async(form)=>{ 
                 console.log("Form found",form);
                if(form== null){
                    res.status(404).send('Form not found or already deleted');
                } else { 
                    if(form){
                        form.remove(function(err) {
                            if(err) { return res.status(500).send(err) }
                            console.log('Form deleted');                 
                            return res.status(202).send("Form Deleted")
                          });                       
                    } 
                    else{
                        //res.status(401).send("You are not the owner of this Form");
                        res.json({
                           message: "Post deleted successfully",
                    })}
                }
            });
        } catch (error) {
            
        }
    },

    // deletePost : (req, res)  {
    //     let quiz = req.body; //This line inherits postById method
    //     .remove((err, post) => {
    //       if (err) {
    //         return res.status(400).json({
    //           error: err,
    //         });
    //       }
    //       res.json({
    //         message: "Post deleted successfully",
    //       });
    //     });
    //   };

    getFormById: async(req, res)=>{
        try {
            var formId = req.params.formId;

            await FormModel.findOne({_id: formId}).then(async(form)=>{
                 
                 if(form == null){
                     res.status(404).send('Form not found');
                 } else{ 
                     res.status(200).json(form)
                 }
             })

        } catch (error) {
            res.send(error)
        }
    },
    
    deleteForm: async(req, res)=>{

        try {
            var formId = req.params.formId;
            var userId = req.params.userId;

            console.log(formId);
            console.log(userId);

            await FormModel.findOne({_id: formId}).then(async(form)=>{ 
                 console.log(form);
                if(form== null){
                    res.status(404).send('Form not found or already deleted');
                } else { 
                    if(form.createdBy == userId){
                        form.remove(function(err) {
                            if(err) { return res.status(500).send(err) }
                            console.log('Form deleted');                 
                            return res.status(202).send("Form Deleted")
                          });                       
                    } 
                    else{
                        res.status(401).send("You are not the owner of this Form");
                    }
                }
            });
        } catch (error) {
            
        }
    },

    editForm : async(req, res)=>{
        try {
            var  formId =  req.body.formId;
            var data = {
                title: req.body.title,
                description: req.body.description,
                tool: req.body.tool,
                features: req.body.features,
                credits: req.body.credits,
                timelimit: req.body.timelimit,
                questions: req.body.questions
            }

            console.log("Hi, I am from backend, this is form data that i recivied");
            

            console.log(data);
            

            FormModel.findByIdAndUpdate(formId, data ,{new: true} ,(err, result)=>{
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(200).json(result)
                }
            });
           
        } catch (error) {
            res.send(error)
        }
    },

    getAllFormsOfUser: async(req, res)=>{
        try {
            var userId = req.params.userId;
            console.log(userId);
            await UserModel.findOne({_id:userId}).then(async(user)=>{
                if(user == null){
                    res.status(404).send('User not found');
                } else{ 
                   await FormModel.find().where('_id').in(user.createdForms).exec((err, records) => {
                       console.log(records);
       
                       res.status(200).json(records);
                   });
                }

             //   res.send(docs.createdForms)
            });

            
        } catch (error) {
            res.send(error)
        }
    },

    submitResponse : async(req, res)=>{
        try {
            var data = {
                formId: req.body.formId,
                userId: req.body.userId,
                response: req.body.response
            }
            console.log(data.formId);
            console.log(data.userId);
            
            
            if (data.response.length > 0) {
                var newResponse = new ResponseModel(data)
               // console.log(newResponse);
                
                await newResponse.save().then((docs)=>{              
                    res.status(200).json(
                        docs
                    );
                })
            } 
            else{
                res.status(400).send("FIll atleast one field, MF!"); 
            } 
        } catch (error) {
            res.send(error)
        }
    },

    allResponses : async(req,res)=>{
        try{
            var result = await ResponseModel.find().lean();
            res.json(result);     
        }catch(e){
            res.send(e);
        }
    },

    getResponse: async(req, res)=>{
        try {
            var formId = req.params.formId;
         //   console.log(formId);
            
            await ResponseModel.find({formId: formId}).then(async(responses)=>{ 
                    res.status(200).json(responses)
            })

        } catch (error) {
            res.send(error)
        }
    }

}


// FormId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Form'
//   },

//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'     
//   },

//   response : [{
//       questionId: String,
//       optionId: String,
//   }],
var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var FormSchema = new mongoose.Schema({

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  course: String,

  day: Number,

  link: String,

  

  

  questions : [{
    open: {type: Boolean, default: false},
    questionText: String,
    options: [{
      optionText : String,
    }],
    answer: String,
  }],



    
      
    }, {timestamps: true});

FormSchema.plugin(mongoosePaginate);
Form= mongoose.model('Form', FormSchema ,'Form');

module.exports = Form; 

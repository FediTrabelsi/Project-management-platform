const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
const Schema = mongoose.Schema;


const projectSchema= new Schema({
    projectname : {type : String, required : true, unique : true},
    creationDate : {type : String, required : true},    
    description : {type : String, required : true},
    technologies : [
        {name : { type : String ,default:""} } 
    ],
    creator : { creatorname : {type : String},
                _id : {type : String},
                imgsrc : {type : String}         
    },
    members : [{
        _id : {type : String},
        membername :{type : String},
        imgsrc : {type : String} 
    }],
    attachedFiles : [{
        addDate : {type : String },
        filesrc : {type : String },
        filename : {type : String},
        description : {type : String },
        uploader : {type : String }
    }],
    tasks : [{
        addDate : {type : String},
        taskname : {type : String},
        description : {type : String},
        deadline : {type : String},
        status : {type : String ,default :"in progress"},
        assignedTo : [{
            _id : {type : String},
            name: {type : String}
        }]
    }]
});


module.exports= mongoose.model('Project',projectSchema);
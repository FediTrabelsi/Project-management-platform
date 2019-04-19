const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
const Schema = mongoose.Schema;

const bcryt = require('bcrypt-nodejs');

//email check
let emailLengthCheck= (email)=>{
    if(!email){
        return false;
    }else{
        if (email.length<5 || email.length>30){
            return false ;
        }
        else{
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if (!email) {
      return false; 
    } else {
      const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return regExp.test(email); 
    }
  };

  const emailValidators=[
    {
        validator: emailLengthCheck, message: 'email length must be between 5 and 30 chars'
    }
    ,
        {
            validator: validEmailChecker,
            message: 'The email you provided is not valid'
          }
    
];

//username check
  let usernameLengthChecker = (username)=> {
        if(!username){
            return false;
        }else{
            if(username.length<4 || username.length>15){
                return false;
            }else{
                return true;
            }
        }
  };
  let validUsername = (username) => {
    if (!username) {
      return false; 
    } else {
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      return regExp.test(username); 
    }
  };
  const usernameValidators=[
    {
        validator: usernameLengthChecker, message:'username length must be between 4 and 15 chars'
    },
    {
        validator: validUsername, message :'username must contain only numerical and alphabetical symbols'
    }
  ];

  //password check
let passwordLengthChecker = (password) => {
  if (!password) {
    return false; 
  } else {
    if (password.length < 8 || password.length > 35) {
      return false; 
    } else {
      return true; 
    }
  }
};

let validPassword = (password) => {
  if (!password) {
    return false; 
  } else {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password); 
  }
};

const passwordValidators = [
  {
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but no more than 35'
  },
  {
    validator: validPassword,
    message: 'Must have at least one uppercase, lowercase, special character, and number'
  }
];



const userSchema= new Schema({
    username: {type : String, required : true, unique : true, validate : usernameValidators},
    firstname : {type : String ,default :""},
    lastname : {type : String ,default :""},
    password : {type : String, required : true,validate : passwordValidators},
    email : {type : String, required : true, unique : true, validate : emailValidators},
    creationDate : {type : String, required : true},
    phone : {type : String ,default :""},
    gender : {type : String ,default :""},
    country : {type : String ,default :""},
    description : {type : String ,default :""},
    imagesrc : { type : String,default :""},
    education : [ 
                  { year :{type : String ,default :""}, 
                    place :{type : String ,default :""}, 
                    institution : {type : String ,default :""}
                   }
                   ],
    experiance : [ 
      { exp :{type : String ,default :""}, 
        expyear :{type : String ,default :""}
       }
       ],
    skills : [ {name : { type : String ,default:""} } ],
    intrests : [ { name : {type: String , default : ""} } ],
    projects : [ 
                { 
                  name : {type: String , default : ""},
                  _id : {type : String , default : ""}
                }
                ],
    invitations:[ { type : {type : String , default : ""},
                    invitedTo : {type : String , default : ""},
                    sendDate :{type : String, default : ""},
                    imagesrc : {type : String, default : ""},
                    description:{type : String , default : ""}
    }
    ],
    friends : [{
                 name : {type : String, default: ""},
                imagesrc : {type : String, default: ""}

    }]            



});

userSchema.pre('save',function (next) {
    if(!this.isModified('password'))
    return next();
    bcryt.hash(this.password,null,null,(err,hash)=> {
        if (err) return next(err);
        this.password=hash;
        next();
    });
});


userSchema.methods.comparePassword= function(password){
  if(this.password!=null){
    return bcryt.compareSync(password,this.password);
  }else{
    return false;
  }
};

userSchema.methods.getemail=()=> {
  return userSchema.email;
}
module.exports= mongoose.model('User',userSchema);
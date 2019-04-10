var express = require('express');
var router = express.Router();
const User = require('../models/user');
const jwt= require('jsonwebtoken');
const config=require('../../config/database');


router.get('/register', function (req, res) {
  res.send('Wiki home page');
})


router.post('/register', function (req, res) {
    if (!req.body.email){
        res.json({success: false, message:'you have to provide an email '+JSON.stringify(req.body)});
    }else{
        if (!req.body.username){
            res.json({success: false, message:'you have to provide a username'});
        }else{
            if(!req.body.password){
                res.json({success: false, message:'you have to provide a password'});
            }
            else{
                if(!req.body.passwordconf){
                    res.json({success: false, message:'you have to confirm the password'});

                }
                else{
                    if(req.body.password!=req.body.passwordconf){
                        res.json({success: false, message:'passwords don t match'});
                    }
                    else{
             
        let user= new User({
            username: req.body.username,
            password:req.body.password,
            email:req.body.email,
            creationDate:getDateTime(),
            imagesrc : 'uploads/avatar.jpg'
        });
        user.save((err) => {
            if(err){
                if(err.code===11000){
                    res.json({success:false,message :'username or email already exists'});
                }
                else{
                    if(err.errors){
                        if(err.errors.email){
                        res.json({success:false,message :err.errors.email.message});
                        }else{
                            if(err.errors.username){
                                res.json({success: false, message: err.errors.username.message});
                            }else{
                                if(err.errors.password){
                                    res.json({success: false , message: err.errors.password.message});
                                }else{
                                    res.json({success:false,message :'could not create user',err});
                                }
                            }
                        }
                    }
                    else{
                    res.json({success:false,message :'could not create user',err});
                    }
                }
            }
            else{
                const token =jwt.sign({userId: user._id },config.secret,{expiresIn :'30m'});
                res.json({success: true,message : 'Redirecting to home page ....',token: token,user :{username: user.username,
                userId: user._id}});

            }
        });
        
    }}
}
    
}
}   
});

router.post('/login',(req,res)=>{
    if(!req.body.username){
        res.json({success: false,message : 'You have to insert your username'});
    }else{
        if(!req.body.password){
            res.json({success: false,message : 'You have to insert your password'});
        }else{
            User.findOne({username:req.body.username},(err,user)=>{
                if (err){
                    res.json({success: false,message : err});
                }else{
                    if(!user){
                        res.json({success: false,message : 'Username doesn\'t exist'});
                    }else{
                        var validPassword =  user.comparePassword(req.body.password);
                        if(!validPassword){
                            res.json({success: false,message : 'Wrong password'});
                        }else{
                            const token =jwt.sign({userId: user._id },config.secret,{expiresIn :'30m'});
                            res.json({success: true,message : 'Redirecting to home page ....',token: token,user :{username: user.username,
                            userId: user._id}});
                        }
                    }
                }
            });
        }
    }
});

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

module.exports = router;

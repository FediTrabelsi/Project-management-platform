var express = require('express');
var router = express.Router();
const Project = require('../models/project');
const jwt= require('jsonwebtoken');
const config=require('../../config/database');
const multer = require('multer');
const path = require('path');

router.post('/createProject', function (req, res) {  
    if(!req.body.token){
        res.json({succes : false , message :'you are not coonected'});
    }else{
        if(!req.body.projectname){
            res.json({succes : false , message :'you have to provide a name for the project'});
        }else{
            if(!req.body.description){
                res.json({succes : false , message :'you have to provide a description for your project'});
            }else{
                let project= new Project({
                    projectname: req.body.projectname,
                    creationDate:getDateTime(),
                    description:req.body.description,
                 
                });
                project.save((err) => {
                    if(err){
                            res.json({success:false,message :'could not create project',err});
                            
                        }else{
                            res.json({succes : true , message : 'project was created', projectId :project._id});
                        }

                    
                    
                });
            }
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

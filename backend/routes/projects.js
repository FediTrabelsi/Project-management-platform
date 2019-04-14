var express = require('express');
var router = express.Router();
const Project = require('../models/project');
const User = require('../models/user');
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
                    creator : { creatorname : req.body.username ,
                                _id : req.body.userId,
                                imgsrc : req.body.imagesrc        
                    }
                 
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

router.post('/removeProject', function (req, res) {  
    if(!req.body.token){
        res.json({succes : false , message :'you are not coonected'});
    }else{
        if(!req.body.projectId){
            res.json({succes : false , message :'you have to provide the id of theproject'});
        }else{
                Project.remove({_id : req.body.projectId},function(err,project){
                    if(err){
                        res.json({succes : false , message : 'could not delete project',err});
                    }else{
                        User.findByIdAndUpdate(req.body.userId,
                            {$pull: {projects : {_id : req.body.projectId}}},
                            function(err, user) {
                                if(err){
                                res.json({succes: false , message : 'could not remove project'})
                                }else{
                                  res.json({succes: true , message : 'project removed '})
                                }
                            });
                    }
                })
             
        }
    }
       
        
  
});

router.post('/addMember',function(req,res){
    if(!req.body.token){
        res.json({succes : false , message : 'you are not connected'});
    }else{
        if(!req.body.membername){
            res.json({succes : false , message : 'you have to provide a member name'});
        }else{
            if(!req.body.projectId){
                res.json({succes : false , message : 'you have to provide project id'});
                
            }else{
                
                    var newProject={
                        _id : req.body.projectId,
                        name : req.body.projectname
                      };
                    User.findOneAndUpdate({username : req.body.membername},
                        {$push: {projects : newProject }},
                        {safe: true, upsert: true},
                        function(err, user) {
                            if(err){
                              res.json({succes: false , message : 'could not find that user'})
                            }else{
                                var newMember={
                                    _id : user._id,
                                    membername : req.body.membername,
                                    imgsrc : user.imagesrc
                                  };
                                Project.findByIdAndUpdate(req.body.projectId,
                                    {$push: {members : newMember}},
                                    {safe: true, upsert: true},
                                    function(err, user) {
                                        if(err){
                                        res.json({succes: false , message : 'could not invite that user'})
                                        }else{
                                          res.json({succes: true , message : 'user invited'})
                                        }
                                    });
                            }
                        });
                
            }
        }
    }
});

router.post('/fetchProjects',function(req,res){
    if(!req.body.token){
        res.json({succes: false , message : 'you are not connected'});
    }else{
        Project.find({$or:[{"creator._id": req.body.userId },{"members._id": req.body.userId }]}, function(err,projects){
            if(err){
                res.json({succes: false , message : 'could not load projects',err});
            }else{
                res.json({succes : true, message : 'projects loaded ' ,projects : projects})
            }
        } );
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

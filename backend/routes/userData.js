var express = require('express');
var router = express.Router();
const User = require('../models/user');
const jwt= require('jsonwebtoken');
const config=require('../../config/database');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,'./uploads/');
  },
  filename: function(req,file,cb){
    cb(null,'profile' +file.originalname);
  }
});
const upload = multer({storage : storage});


router.get('/update', function (req, res) {
    res.send('user update api');
  });
  router.get('/update', function (req, res) {
    res.send('user update api');
  });

router.post('/updateImage',upload.single('profileImg'),function(req,res){
  id=req.body.userId;
  User.update({_id:id},{
    imagesrc : req.file.path
  }, function(err, affected, resp) {
    if(err){
    res.json({succes : false , message : 'could not update'});}
    else{
      res.json({succes : true , message : 'profile img updated',newsrc : 'uploads/profile'+req.file.originalname });
    }
 }
  );
  console.log(req.file.path)

});  



router.post('/update',function(req,res){
  if (!req.body.token){
    res.json({success: false, message:'you are not connected'});
}else{
 
    User.update({_id:req.body.userId},{
      firstname : req.body.firstname,
      lastname :req.body.lastname,
      email : req.body.email,
      phone : req.body.phone,
      country : req.body.country,
      description : req.body.description
    }, function(err, affected, resp) {
      if(err){
      res.json({succes : false , message : 'could not update'});}
      else{
        res.json({succes : true , message : 'profile data updated' });
      }
   }) ;
 
  
}}
);

router.post('/addEducation',function(req,res){
  if(!req.body.token){
    res.json({succes : false , message :'you are not coonected'});
  }else{
    if(!req.body.year ){
      res.json({succes : false , message :' no data to add'});
    }else{
      if(!req.body.userId){
        res.json({succes : false , message :' no user id provided'});
      }else{
      var newEducation={
        year : req.body.year,
        institution : req.body.institution,
        place : req.body.place
      };
      User.findByIdAndUpdate(req.body.userId,
        {$push: {education : newEducation}},
        {safe: true, upsert: true},
        function(err, user) {
            if(err){
            res.json({succes: false , message : 'could not add education'})
            }else{
              res.json({succes: true , message : 'education added'})
            }
        });
    }
  }
  }
});

router.get('/getNumber',function(req,res){
  res.send({number : 13})
});

router.post('/addExperiance',function(req,res){
  if(!req.body.token){
    res.json({succes : false , message :'you are not coonected'});
  }else{
    if(!req.body.exp ){
      res.json({succes : false , message :' no data to add'});
    }else{
      if(!req.body.userId){
        res.json({succes : false , message :' no user id provided'});
      }else{
      var newExperiance={
        expyear : req.body.expyear,
        exp : req.body.exp
      };
      User.findByIdAndUpdate(req.body.userId,
        {$push: {experiance : newExperiance}},
        {safe: true, upsert: true},
        function(err, user) {
            if(err){
            res.json({succes: false , message : 'could not add experiance'})
            }else{
              res.json({succes: true , message : 'experiance added'})
            }
        });
    }
  }
  }
});

router.post('/removeExperiance',function(req,res){
  if(!req.body.token){
      res.json({succes : false , message :'you are not connected'});
  }else{
   if(!req.body.expId){
     res.json({succes : false , message :' no data specified to delete'});
   }else{
     User.findByIdAndUpdate(req.body.userId,
      {$pull: {experiance : {_id : req.body.expId}}},
      function(err, user) {
          if(err){
          res.json({succes: false , message : 'could not remove experiance'})
          }else{
            res.json({succes: true , message : 'experiance removed'})
          }
      });
   }
  }
});

router.post('/removeEducation',function(req,res){
    if(!req.body.token){
        res.json({succes : false , message :'you are not connected'});
    }else{
     if(!req.body.edId){
       res.json({succes : false , message :' no data specified to delete'});
     }else{
       User.findByIdAndUpdate(req.body.userId,
        {$pull: {education : {_id : req.body.edId}}},
        function(err, user) {
            if(err){
            res.json({succes: false , message : 'could not remove education'})
            }else{
              res.json({succes: true , message : 'education removed'})
            }
        });
     }
    }
});

router.post('/addSkill',function(req,res){
  if(!req.body.token){
    res.json({succes : false , message :'you are not coonected'});
  }else{
    if(!req.body.skillname ){
      res.json({succes : false , message :' no skill to add'});
    }else{
      if(!req.body.userId){
        res.json({succes : false , message :' no user id provided'});
      }else{
      var newSkill={
        name : req.body.skillname
      };
      User.findByIdAndUpdate(req.body.userId,
        {$push: {skills : newSkill}},
        {safe: true, upsert: true},
        function(err, user) {
            if(err){
            res.json({succes: false , message : 'could not add skill'})
            }else{
              res.json({succes: true , message : 'skill added'})
            }
        });
    }
  }
  }
});

router.post('/removeSkill',function(req,res){
  if(!req.body.token){
      res.json({succes : false , message :'you are not connected'});
  }else{
   if(!req.body.skillname){
     res.json({succes : false , message :' no skill specified to delete'});
   }else{
     User.findByIdAndUpdate(req.body.userId,
      {$pull: {skills : {name : req.body.skillname}}},
      function(err, user) {
          if(err){
          res.json({succes: false , message : 'could not remove skill'})
          }else{
            res.json({succes: true , message : 'skill removed'})
          }
      });
   }
  }
});

router.post('/addProject',function(req,res){
  if(!req.body.token){
    res.json({succes : false , message :'you are not coonected'});
  }else{
      var newProject={
        description:req.body.description,
        name : req.body.projectname,
        _id : req.body.projectId
      };
      User.findByIdAndUpdate(req.body.userId,
        {$push: {projects : newProject}},
        {safe: true, upsert: true},
        function(err, user) {
            if(err){
            res.json({succes: false , message : 'could not add project',err})
            }else{
              res.json({succes: true , message : 'project added'})
            }
        });
    }
  
  
});

router.post('/addIntrest',function(req,res){
  if(!req.body.token){
    res.json({succes : false , message :'you are not coonected'});
  }else{
    if(!req.body.intrestname ){
      res.json({succes : false , message :' no intrest to add'});
    }else{
      if(!req.body.userId){
        res.json({succes : false , message :' no user id provided'});
      }else{
      var newIntrest={
        name : req.body.intrestname
      };
      User.findByIdAndUpdate(req.body.userId,
        {$push: {intrests : newIntrest}},
        {safe: true, upsert: true},
        function(err, user) {
            if(err){
            res.json({succes: false , message : 'could not add Intrest'})
            }else{
              res.json({succes: true , message : 'intrest added'})
            }
        });
    }
  }
  }
});

router.post('/removeIntrest',function(req,res){
  if(!req.body.token){
      res.json({succes : false , message :'you are not connected'});
  }else{
   if(!req.body.intrestname){
     res.json({succes : false , message :' no intrest specified to delete'});
   }else{
     User.findByIdAndUpdate(req.body.userId,
      {$pull: {intrests : {name : req.body.intrestname}}},
      function(err, user) {
          if(err){
          res.json({succes: false , message : 'could not remove intrest'})
          }else{
            res.json({succes: true , message : 'intrest removed'})
          }
      });
   }
  }
});
 

router.post('/fetch',function(req,res){
  if (!req.body.token){
    res.json({success: false, message:'you are not connected'});
}else{
  if(!req.body.userId){
    res.json({success: false, message:'no id provided'});
  }else{
    

    User.findById(req.body.userId,(err,user)=>{
      if (err){
          res.json({success: false,message : err});
      }else{
        res.send(user);
      
  }
})

  }
}

});

router.post('/inviteUser',function(req,res){
    if(!req.body.token){
      res.json({success: false, message:'you are not connected'});
    }else{
      if(!req.body.Id){
        res.json({success: false, message:'you have and id '});
      }else{
        if(!req.body.imagesrc){
          res.json({success: false, message:'you have to provide sender profile image'});
        }else{
          if(!req.body.type){
            res.json({success: false, message:'you have to specify invitation type'});
          }else{
            if(!req.body.description){
              res.json({success: false, message:'you have to provide a description'});
            }else{
              if(!req.body.membername){
                res.json({succes: false, message : 'you have to provide the usernmae of the recipient'})
              }else{
                let newInvitation = {
                  type : req.body.type,
                  description: req.body.description,
                  invitedTo : req.body.Id,
                  sendDate : getDateTime(),
                  imagesrc : req.body.imagesrc,
                  sender : req.body.userId
                }
                User.update({username : req.body.membername},
                  {$push: {invitations : newInvitation}},
                  {safe: true, upsert: false},
                  function(err, user) {
                      if(err || user.nModified===0){
                      res.json({succes: false , message : 'could not invite that user'})
                      }else{
                        res.json({succes: true , message : 'user invited'+JSON.stringify(user)})
                      }
                  });
              }
            }
          }
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

  return year + ":" + month + ":" + day ;

}


module.exports = router;

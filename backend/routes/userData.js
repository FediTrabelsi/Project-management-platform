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

})

module.exports = router;

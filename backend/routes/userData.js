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

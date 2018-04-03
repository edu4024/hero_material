const express = require('express');
const router=express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID= require('mongodb').ObjectID;

//connect
const connection = function(closure){
    return MongoClient.connect('mongodb://localhost:27017/hero', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

//error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

//get heroes
router.get('/heroes', function(req,res){
  connection(function(db){
      db.collection('hero')
          .find()
          .toArray(function(err, docs){
            if(err){
              console.log(err);
              return res.sendStatus(500);
            }
            res.send(docs);
        })
  });
});

//post hero
router.post('/heroes', function(req,res){
  let date=new Date()
  let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour:'numeric',
    minute:"numeric"
  };
  let originalHero={
    name:req.body.name,
    score:Math.floor(Math.random()*100),
    type:req.body.type,
    color:'black',
    date:date.toLocaleString('ru', options)
  };
  connection(function(db){
    db.collection('hero')
        .save(originalHero, function(err, result){
            if(err){
              console.log(err);
              return  res.sendStatus(500);
            }
            res.send(originalHero);
      });
  });
});

//delete hero
router.delete('/heroes/:id', function(req,res){
  connection(function(db){
    db.collection('hero')
      .deleteOne({_id:ObjectID(req.params.id)},
      function(err, doc){
        if(err){
          console.log(err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      });
  });
});

//find hero
router.get('/heroes/:id', function(req,res){
      connection(function(db){
        db.collection('hero')
          .findOne({_id:ObjectID(req.params.id)},
          function(err, doc){
            if(err){
              console.log(err);
              return res.sendStatus(500);
            }
            res.send(doc);
          });
      });
});

//update hero
router.put('/heroes/:id', function(req,res){
  connection(function(db){
    let date=new Date()
    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour:'numeric',
      minute:"numeric"
    };
      db.collection('hero')
        .updateOne(
          { _id:ObjectID(req.params.id) },
          { name:req.body.name,
            score:Math.floor(Math.random()*100),
            type:req.body.type,
            color:req.body.color,
            date:date.toLocaleString('ru', options)},
          function (err,result){
            if(err){
              console.log(err);
              return  res.sendStatus(500);
            }
              res.sendStatus(200);
          }
        )
  });
});


module.exports = router;

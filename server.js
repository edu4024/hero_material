const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const path = require('path');
const port=8080;

const api = require('./api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api',api);

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

  app.listen(port, function () {
    console.log('API app started '+ port);
  })

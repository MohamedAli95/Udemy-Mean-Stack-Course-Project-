const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const path = require("path");


mongoose.connect('mongodb+srv://mohamed:'+process.env.MONGO_ATLAS_PW +'@cluster0-fyigo.mongodb.net/meanUdemy?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, }).
then(() => {
  console.log('connected to database!')
}).
catch(() =>{
  console.log('connection failed!');
})

app.use(bodyParser.json());
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET,PATCH,PUT,POST,DELETE ,OPTIONS");
  next();
});

app.use("/images",express.static(path.join("backend/images")));
app.use('/api/posts',postRoutes);
app.use('/api/user',userRoutes);
module.exports = app;

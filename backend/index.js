const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 5001;
const multer = require('multer');
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const dbConnect = require('./config/dbConnection')
dbConnect();
app.use(express.json())
app.use(cors());
app.use('/',require("./routes/productRoute"));
app.use('/user',require("./routes/userRoute"))
app.use('/upload', express.static('upload'));
app.listen(port,()=>{
    console.log(`server is running on the port ${port}`)
});
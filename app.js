const express = require('express');
const app  = express();
const PORT = process.env.PORT || 2500;
const cors = require('cors');
const axios = require("axios");

const router = require('./route/route')

app.use(cors());
app.use('/flights',router);
app.use(express.json());
app.use(express.urlencoded({extended: false}))





app.listen(PORT, ()=>{
    console.log(`Server is listen on port: ${PORT}`)
})
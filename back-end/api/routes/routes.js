const User = require("../model/user");
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const UserController = require('../controller/controller');  // Update the path accordingly


var emailPattern = /([\w\.-]+)@northeastern\.edu$/;
var passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
var namePattern = /^[a-zA-Z\s]+$/;




module.exports = (app) => {



app.post('/user/login',UserController.login);

app.get('/', function (req, res) {
    res.send('Hello, world'); 
});
app.put('/user/edit/:email', UserController.edit);
app.delete('/user/delete/:email', UserController.delete);
app.post('/user/create', UserController.create);
app.get("/user/getAll",UserController.getAll);


}

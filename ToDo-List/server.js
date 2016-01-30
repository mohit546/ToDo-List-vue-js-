var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var passport = require('passport');

var app = express();

mongoose.connect(config.database,function(err){
	if(err){
		console.log(err);
	}else{
		console.log("connected to database");
	}
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var api = require('./app/route/api')(app, express);
app.use('/api',api);

app.use(express.static(__dirname + '/public'));

// app.get('/login',function(req,res){
// 	res.sendFile(__dirname + '/public/loginApp/html/loginIndex.html');
// })

// app.get('/home/progress',function(req,res){
// 	res.sendFile(__dirname + '/public/under_construction/underConstruction.html');
// })

app.get('/home',function(req,res){
	res.sendFile(__dirname + '/public/template/todoList/todoList.html');
})

app.get('*',function(req,res){
	res.sendFile(__dirname + '/public/template/login/login.html');
});

app.listen(config.port, function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Server is listening on 4000");
	}
});

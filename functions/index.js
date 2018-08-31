const spawn = require('cross-spawn').spawn;
const execa = require('execa').spawn;
const cmd = require('spawn-cmd').spawn;
var fs = require('fs');
var express = require('express');
const firebase = require('firebase-admin');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var session = require('express-session');
var memoryStore = require('memorystore')(session);
const functions = require('firebase-functions');
var cookieParser = require('cookie-parser');
var path = require('path');

//To initialise Firebase. All firebase code is removed when I run on localhost.
const firebaseApp = firebase.initializeApp(
	functions.config().firebase
);


//DEFINITIONS	
var app = express();
app.use(cookieParser());
app.use(bodyParser.json()); //support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true})); //support encoded bodies
var port = process.env.PORT || 8080;

//COOKIES - Setting cookies to remember user sessions.
app.use(session({ 
	secret: 'thisisajsmolsecret',
	store: new memoryStore({
      checkPeriod: 43200000 // prune expired entries every 12h
    }),
	resave: true,
	saveUninitialized: true,
}));

//ROUTES

//GET - Loads the homepage of the website from the server
// app.get('/', function(req,res){
// 	res.sendFile(path.resolve (__dirname + '/../public/index.html'));
// });

//GET - Loads the newly generated PDB file for the JSmol applet.
app.get('/:file', function(req,res){
	var fileName = req.params.file;
	res.sendFile(fileName);
})

//POST - To receive the arguments for CarbBuilder from the input field on the HTML page.
app.post('/session', function(req,res){	
	//Stores this browser session's unique ID.
	var session = req.session.id;

	//Adds session ID as the output name of the file CarbBuilder will produce.
	var args = req.body.args + " -o " + session;

	//Calls method with these arguments
	runCarbBuilder(args);
	
	//Sends the sessionID to the HTML code. This is so JSMol knows which file to load
	//for that client.

	res.send(session);
});

//Runs CarbBuilder2.exe with the given arguments and outputs a PDB file.
function runCarbBuilder(args){
	spawn.sync('files/CBv2.1.25/CarbBuilder2.exe', args.split(" "), { stdio: 'inherit'});
	//execa('./files/CBv2.1.25/CarbBuilder2.exe', args.split(" "), { stdio: 'inherit' , shell: true});
	//cmd('./files/CBv2.1.25/CarbBuilder2.exe', args.split(" "), { stdio: 'inherit'});
}

//To run on localhost, I use this code
// app.listen(port);
// console.log("Server started at: " + port);

//To run on Firebase, I use this code. Only one of these need to be used in this file at a time.
exports.app = functions.https.onRequest(app);
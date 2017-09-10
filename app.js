var express = require ('express');
var exphbs = require ('express-handlebars');
var path = require('path');
var bodyparser = require('body-parser');
var methodOverride = require ('method-override');
var redis = require('redis');
var morgan = require('morgan');
var Table = require('easy-table');

//set port
const port = 3000;

//init app
var app = express();
 
//redis connect
let client = redis.createClient();
client.on('connect', function(){
	console.log('Conected to Redis...');
});

//logger
app.use(morgan('dev'));

//view engine
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//body-parser
app.use (bodyparser.json());
app.use (bodyparser.urlencoded({extended:false}));

//methooverride
app.use(methodOverride('_method'));

//HomePage
app.get('/', function(req, res, next){
	res.render('searchusers');
});

//Search User
app.post('/user/search', function(req, res, next){
	let id=req.body.id;
	console.log('Searching: ' + id);
	 client.hgetall(id, function(err, obj){
		 if (!obj){
			res.render('searchusers',{
				error: 'user does not exist'
			}) ;
		 } else {
			 obj.id = id;
			 res.render('details', {
				 user: obj
			 });
		 }
	 });
	
});

//services list
app.get('/user/services', function(req, res, next){
	//const { spawn } = require('child_process');
	//const bat = spawn('powershell.exe', ['/c', 'get-service']);
	//bat.stdout.on('data',(data) => {
		//console.log(`${data}`);
	//});
	const { exec } = require('child_process');
	exec('powershell.exe get-service', (err, stdout, stderr) => {
	  if (err) {
	    console.error(err);
	    return;
	  }
	  //console.log(stdout);
	  
	  var array = stdout.toString().split("\n");
	  for (i in array){
		  line = array[i].split(" ");
		  //var arrobj = { 
		  //}
			  console.log (line);
			  }
			  
	  res.render('services', {
			data: array
			
		});
	});
	

	
});


app.listen(port, function(){
		console.log('server started on port: '+ port);
});

var express = require ('express');
var exphbs = require ('express-handlebars');
var path = require('path');
var bodyparser = require('body-parser');
var methodOverride = require ('method-override');
var redis = require('redis');

//set port
const port = 3000;

//init app
var app = express();
 
//view engine
app.engine('hbs', exphbs({defaultLayout:'main'}));
app.set('view engine', 'hbs');

//body-parser
app.use (bodyparser.json());
app.use (bodyparser.urlencoded({extended:false}));

//methooverride
app.use(methodOverride('_method'));
app.get('/', function(req, res, next){
	res.render('searchusers');
});

app.listen(port, function(){
	console.log('server started on port: '+ port);
});

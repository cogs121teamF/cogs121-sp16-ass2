//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var dotenv = require('dotenv');
var pg = require('pg');
var app = express();

//client id and client secret here, taken from .env (which you need to create)
dotenv.load();

//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;
var client =  new pg.Client(conString);
//Configures the Template engine
app.engine('html', handlebars({ defaultLayout: 'layout', extname: '.html' }));
app.set("view engine", "html");
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',
                  saveUninitialized: true,
                  resave: true}));

//set environment ports and start application
app.set('port', process.env.PORT || 3000);

//routes
app.get('/', function(req, res){
  res.render('index');
});

app.get('/delphidata', function (req, res) {
  // TODO
  // Connect to the DELPHI Database and return the proper information
  // that will be displayed on the D3 visualization
  // Table: Smoking Prevalance in Adults
  // Task: In the year 2003, retrieve the total number of respondents
  // for each gender. 
  // Display that data using D3 with gender on the x-axis and 
  // total respondents on the y-axis.
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    console.log("Beginning query...");
    client.query("SELECT number_of_respondents FROM cogs121_16_raw.cdph_smoking_prevalence_in_adults_1984_2013 WHERE year = 2003 AND gender in ('Female', 'Male', 'Total')", function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      result = result.rows;
      result[0].gender = "Female";
      result[1].gender = "Total";
      result[2].gender = "Male";
      // console.log(result);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
      console.log("Query successful!");
      res.json(result);
    });
  });
  return { delphidata: "No data present." }
});


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

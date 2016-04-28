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
    client.query('SELECT lat, lon, "Permit_Nam", "Business_A", "Address_co" FROM cogs121_16_raw.sandag_taqueria_foodretail_project WHERE ABS(lon) > 116.8', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      result = result.rows;
      //console.log(result);
      //result[0].gender = "Female";
      //result[1].gender = "Total";
      //result[2].gender = "Male";
      // console.log(result);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
      console.log("Query successful!");
      res.json(result);
    });
  });
  return { delphidata: "No data present." }
});

app.get('/yelpcall', function (req, res) {
  // Request API access: http://www.yelp.com/developers/getting_started/api_access
  var Yelp = require('yelp');

  var yelp = new Yelp({
    consumer_key: '1FJDwPwRUG92MrMMW7XALg',
    consumer_secret: 'yWh_HLaaXxItjgAsrBMPEB7sY3E',
    token: 'teGc5nu4M9Dg1nB7_-YkfY3E4qE7b4Bb',
    token_secret: 'LXmuL0T16f1mvTnzINCS9d65D88',
  });

  // See http://www.yelp.com/developers/documentation/v2/search_api
  //var lat = "32.7309,117.2243";
  yelp.search({ 
    location: req.query.location, 
    cll: "" + req.query.lat + "," + req.query.lon + ""
  })
  .then(function (data) {
    //console.log("Inside function");
    // var json = JSON.parse(data);
    //console.log(data['businesses']);
    for(var x in data['businesses']) {
      // console.log(data['businesses'][x]['name']);
      var businessName = data['businesses'][x]['name'].toLowerCase();
      businessName = businessName.replace(/[^a-zA-Z-]/g, '');
      //console.log(businessName);
      if(businessName.indexOf(req.query.name) > -1 ) {
        console.log(data['businesses'][x]['name']);
        var jsonReturn = {
          "name": data['businesses'][x]['name'],
          "url": data['businesses'][x]['url'],
          "image": data['businesses'][x]['image_url'],
          "review_count": data['businesses'][x]['review_count'],
          "rating": data['businesses'][x]['rating'],
          "rating_image_url": data['businesses'][x]['rating_img_url'],
        }
        res.json(jsonReturn);
      }
    }
    //res.json(data);
  })
  .catch(function (err) {
    console.error(err);
  });
});


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

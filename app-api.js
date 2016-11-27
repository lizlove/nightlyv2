// app-api.js

// BASE SETUP
// =============================================================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var compression = require('compression');


// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to use compression() to set a web home
app.use(compression());
app.use(express.static(__dirname + '/public', { maxAge: 86400000 }));

var port = process.env.PORT || 8080;


// ROUTES API
// =============================================================================
var router = express.Router();

// test route (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// add success and fail methods to response
express.response.success = function(data) {
  this.json({success: true, "data": data});
};
express.response.fail = function(code, message) {
  this.json({success: false, "code": code, "message": message});
};

// more routes for our API will happen here

// REGISTER ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

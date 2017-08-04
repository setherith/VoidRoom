var hbs = require('hbs');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index', {title: 'Home'});
});

app.get('/add', function(req, res) {
    res.render('add', {title: 'Add Room'});
});

app.post('/add', function(req, res) {    
    // console.log(req.body.name); //value[s] from the forms
    res.render('add', {room:req.body.name, title: 'Add Room'});
});

app.listen(3000, function() {
    console.log('Server Started');
});
var hbs = require('hbs');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var mongoClient = mongo.MongoClient();
var dburl = "mongodb://localhost:27017/voidroom";

mongoClient.connect(dburl, function(err, db) {
    if(err) throw err;
    db.createCollection('rooms', function(err, res) {
        if(err) throw err;
        db.close();
    });
});

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
    mongoClient.connect(dburl, function(err, db) {
        if(err) throw err;
        db.collection('rooms').find().toArray(function(err, result) {
            if(err) throw err;
            db.close();
            res.render('add', {title: 'Add Room', rooms: result});
        });
    });
});

app.post('/add', function(req, res) {    
    mongoClient.connect(dburl, function(err, db) {
        db.collection('rooms').insertOne({name:req.body.name}, function(err, res) {
            if(err) throw err;
            db.close();
        });
    });

    mongoClient.connect(dburl, function(err, db) {
        db.collection('rooms').find().toArray(function(err, result) {
            if(err) throw err;
            db.close();
            res.render('add', {room:req.body.name, title: 'Add Room', rooms: result});
        });
    });
});

app.listen(3000, function() {
    console.log('Server Started');
});
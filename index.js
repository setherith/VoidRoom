var fs = require('fs');
var cons = require('consolidate');
var bars = require('handlebars');

var express = require('express');
var app = express();

app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + '/public'));

app.use('/', function(req, res) {
    bars.registerPartial('content', fs.readFileSync(__dirname + '/views/index.hbs', 'utf8'));
    res.render('layout', {
        title : 'Home'
    });
});

app.listen(3000, function() {
    console.log('Port: ' + 3000);
});
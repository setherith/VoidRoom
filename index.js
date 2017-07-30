var fs = require('fs');
var cons = require('consolidate');
var bars = require('handlebars');

var express = require('express');
var app = express();

app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use('/', function(req, res) {
    bars.registerPartial('content', fs.readFileSync(__dirname + '/views/index.hbs', 'utf8'));
    res.render('layout', {
        title : 'This is a test'
    });
});

app.listen(3000, function() {
    console.log('Port: ' + 3000);
});
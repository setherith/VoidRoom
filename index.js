var fs = require('fs');
var cons = require('consolidate');
var bars = require('handlebars');

var express = require('express');
var app = express();

app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

bars.registerPartial('footer', fs.readFileSync(__dirname + '/views/partials/footer.hbs', 'utf8'));

app.use('/', function(req, res) {
    res.render('index', {
        title : 'This is a test'
    });
});

app.listen(3000, function() {
    console.log('Port: ' + 3000);
});
var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/', require('./controllers'));

app.use((error, req, res, next) => {
    var message = error.toString();
    message.replace("Error:", "");
    res.status(500).send({ "message": message });
});

app.listen(8000,() => {
    console.log('Server is up on port 8000');
});
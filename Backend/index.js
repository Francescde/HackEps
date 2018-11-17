/**
 * Created by francescdepuig on 17/11/2018.
 */
var express = require('express');
var app = express();
var path = require('path');
const port = 8080;
const templetesFolder='/templates';
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname +templetesFolder+'/index.html'));
});
app.use(express.static('templates'));

app.listen(port);
//console.log('Example app listening on port '+port+'!');

/**
 * Created by francescdepuig on 17/11/2018.
 */
var express = require('express');
var app = express();
var path = require('path');
//var bodyParser = require('body-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8080;
const templetesFolder='/templates';
// viewed at http://localhost:8080
// Imports the Google Cloud client library
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
// application specific logging, throwing an error, or other logic here
});
const language = require('@google-cloud/language');
const clientGo = new language.LanguageServiceClient();


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ProtectMe';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname +templetesFolder+'/index.html'));
    });

    app.post('/api/message', function(req, res) {
        /*var user_id = req.body.id;
        var token = req.body.token;
        var geo = req.body.geo;*/
        console.log(req.connection.remoteAddress);
        console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
        console.log(req.body);
        var text = req.body.text;

        var document = {
            content: text,
            type: 'PLAIN_TEXT',
        };

    // Detects the sentiment of the text
        clientGo.analyzeSentiment({document: document})
            .then(results => {
                console.log(results);
            console.log(results[0].sentences[0]);

        //const sentiment = results[0].documentSentiment;
            //console.log(`Text: ${text}`);
            //console.log(`Sentiment score: ${sentiment.score}`);
            //console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
            //console.log(sentiment);

            res.send('Ok');
        }).catch(err => {
                console.error('ERROR:', err);
        });
    });


    app.get('/api/message', function(req, res) {
        /*var user_id = req.body.id;
         var token = req.body.token;
         var geo = req.body.geo;*/
        console.log(req.connection.remoteAddress);
        console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
        console.log(req.body);
        var text = req.query.message;
        var message=req.body;
        var document = {
            content: text,
            type: 'PLAIN_TEXT',
        };

    // Detects the sentiment of the text
        clientGo.analyzeSentiment({document: document})
            .then(results => {
            console.log(results);
            console.log(results[0].sentences[0]);
            message.results=results;
            console.log(message);

        var MongoClient = require('mongodb').MongoClient;

// Connect to the db
            MongoClient.connect("mongodb://localhost:27017/ProtectMe", function (err, db) {
                console.log(err);
                console.log(1);

                db.collection('messages', function (err, collection) {
                    console.log(2);

                    collection.insert(message);
                    collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
                    collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });



                    db.collection('Persons').count(function (err, count) {
                        if (err) throw err;

                        console.log('Total Rows: ' + count);
                    });
                });

            });
        console.log(3);
            //const sentiment = results[0].documentSentiment;
            //console.log(`Text: ${text}`);
            //console.log(`Sentiment score: ${sentiment.score}`);
            //console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
            //console.log(sentiment);

            res.send('Ok');
        }).catch(err => {
            console.error('ERROR:', err);
        });
    });

    app.use(express.static('templates'));

    app.listen(port,'0.0.0.0');
    //console.log('Example app listening on port '+port+'!');

    client.close();
});
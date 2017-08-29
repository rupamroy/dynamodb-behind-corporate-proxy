var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var config = require('./config');

AWS.config.update(config);

var docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing movies into DynamoDb. Please wait.');

var allMovies = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'moviedata.json'), 'utf-8'));

allMovies.forEach((movie, i) => {
    var params = {
        TableName: 'Movies',
        Item: {
            'year': movie.year,
            'title': movie.title,
            'info': movie.info
        }
    };

    docClient.put(params, (err, data) => {
        if (err) {
            console.error('Unable to add movie', movie.title, '. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('PutItem succeeded:', movie.title);
        }
    });
    //return i === 2;
});
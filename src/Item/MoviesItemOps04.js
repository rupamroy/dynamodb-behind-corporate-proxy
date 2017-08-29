// This code increases the value of a numeric attribute by 1. 

var AWS = require('aws-sdk');
var config = require('../config');

AWS.config.update(config);

var docClient = new AWS.DynamoDB.DocumentClient()

var table = 'Movies';

var year = 2015;
var title = 'The Big New Movie';

// Increment an atomic counter

var params = {
    TableName:table,
    Key:{
        'year': year,
        'title': title
    },
    UpdateExpression: 'set info.rating = info.rating + :val',
    ExpressionAttributeValues:{
        ':val':1
    },
    ReturnValues:'UPDATED_NEW'
};

console.log('Increasing the rating....');
docClient.update(params, function(err, data) {
    if (err) {
        console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
    }
});

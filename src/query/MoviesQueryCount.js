var AWS = require("aws-sdk");
var config = require('../config');

AWS.config.update(config);

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 2013.");

var params = {
    TableName : "Movies",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":2013
    },
    Select: 'COUNT'
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Total movies for 2013: " + data.Count);
    }
});
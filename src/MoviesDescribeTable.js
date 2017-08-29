var AWS = require('aws-sdk');
var config = require('./config');

AWS.config.update(config);

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: 'Movies',
};

dynamodb.describeTable(params, (err, data) => {
    if (err) {
        console.error("Unable to describe table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table description JSON:", JSON.stringify(data, null, 2));
    }
});
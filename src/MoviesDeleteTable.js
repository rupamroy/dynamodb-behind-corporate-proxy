var AWS = require('aws-sdk');
var config = require('./config');

AWS.config.update(config);

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: 'Movies',
};

dynamodb.deleteTable(params, (err, data) => {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
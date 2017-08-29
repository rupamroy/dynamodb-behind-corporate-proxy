/*
You can use the delete method to delete one item by specifying its primary key. You can optionally provide a ConditionExpression to prevent item deletion if the condition is not met.
In the following example, you try to delete a specific movie item if its rating is 5 or less.
*/

var AWS = require("aws-sdk");
var config = require('../config');

AWS.config.update(config);

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName:table,
    Key:{
        "year":year,
        "title":title
    },
    ConditionExpression:"info.rating <= :val",
    ExpressionAttributeValues: {
        ":val": 5.0
    }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});

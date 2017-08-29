/*
The program included in this step retrieves all movies released in the year 1985.
*/

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
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});

/*
ExpressionAttributeNames provides name substitution. We use this because year is a reserved word in DynamoDB—you cannot use it directly in any expression,
 including KeyConditionExpression. We use the expression attribute name #yr to address this.
ExpressionAttributeValues provides value substitution. We use this because you cannot use literals in any expression, including KeyConditionExpression. 
We use the expression attribute value :yyyy to address this.
*/
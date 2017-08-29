var AWS = require('aws-sdk');
var config = require('./config');

AWS.config.update(config);

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: 'Movies',
    KeySchema: [{
            AttributeName: 'year',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'title',
            KeyType: 'RANGE'
        },
    ],
    AttributeDefinitions: [{
            AttributeName: 'year',
            AttributeType: 'N'
        },
        {
            AttributeName: 'title',
            AttributeType: 'S'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 25,
        WriteCapacityUnits: 25
    }
};

dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.log('Unable to create table. Error JSON:' + JSON.stringify(err, null, 2));
    } else {
        console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
    }
});
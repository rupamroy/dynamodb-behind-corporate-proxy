var AWS = require('aws-sdk');
var config = require('../config');

AWS.config.update(config);

var docClient = new AWS.DynamoDB.DocumentClient();

var table = 'Movies';

var year = 2015;

var title = 'The Big New Movie';

var params = {
    TableName: 'Movies',
    Item: {
        'year': year,
        'title': title,
        'info': {
            'plot': 'Nothing great happens',
            'rating': 0
        }
    }
};

console.log('Adding new item...');

docClient.put(params, (err, data) => {
    if (err) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Added item:', JSON.stringify(data, null, 2));
    }
});
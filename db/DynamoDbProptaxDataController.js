const AWS = require('aws-sdk');
const config = require('./config.js');
// const { v1 as uuidv1 } = require('uuid');
const { v1: uuidv1 } = require('uuid');

const getItems = function (req, res) {
    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.aws_table_name
    };

    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.send({
                success: true,
                items: Items
            });
        }
    });
}

const addItem = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    
    
    const Item = { ...req.body };
    Item.id = uuidv1();
    // remove unwanted form data
    delete Item.abschicken;

    var params = {
        TableName: config.aws_table_name,
        Item: Item
    };

    // Call DynamoDB to add the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            console.log('error while storing item in dynamoDB:', err);
            console.log('data:', data);
            res.send({
                success: false,
                message: err
            });
        } else {
            console.log('success - stored item in dynamoDB:', err);
            console.log('success - data:', data);
            res.send({
                success: true,
                message: 'Added item',
                item: data
            });
        }
    });
}

module.exports = {
    getItems,
    addItem
}
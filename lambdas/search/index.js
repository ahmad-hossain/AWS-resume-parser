// const AWS = require('aws-sdk');
// const client = new AWS.DynamoDB.DocumentClient();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { ExecuteStatementCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event) => {
  console.log("Event is: ", event);
  let wordToSearch = event.queryStringParameters.query;
  console.log("wordToSearch is: ", wordToSearch);

  const command = new ExecuteStatementCommand({
    Statement: `SELECT id,name,email,phone FROM Resumes WHERE contains(words, ?)`,
    Parameters: [ wordToSearch ]
  });

  try {
    const data = await docClient.send(command);
    console.log("Data is: ", data);
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Items),
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,GET"
      }
    };
    return response;
  } catch (error) {
    throw new Error(`Error querying DynamoDB: ${error}`);
  }
};
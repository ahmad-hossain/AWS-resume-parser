const parser = require('lambda-multipart-parser');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const pdf = require('pdf-parse');
const nlp = require('compromise');

const phoneRegex = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/im;
const emailRegex = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/;

module.exports.handler = async (event) => {
  const result = await parser.parse(event);
  const file = result.files[0]

  await Promise.all([
    uploadToS3(file),
    uploadToDynamoDb(file)
  ]);

  const response = {
    statusCode: 200,
    body: `Uploaded filename=${file.filename}`,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
  };
  return response;
};

async function uploadToS3(file) {
  let params = {
    Bucket: 'ahmad-resume-parser-resumes',
    Key: file.filename,
    Body: file.content
  };

  try {
    const data = await s3.putObject(params).promise();
    console.log("Success:", data);
  } catch (err) {
    console.log("Error: ", err, err.stack);
  }
}

async function uploadToDynamoDb(file) {
  const result = await pdf(file.content);
  console.log('PDF parsed', result.text);

  let words = result.text.split(' ');

  let phone = phoneRegex.exec(result.text)
  phone = phone == null ? 'null' : phone[0]

  let email = emailRegex.exec(result.text);
  email = email == null ? 'null' : email[0]

  let doc = nlp(result.text);
  let names = doc.people().normalize().text();
  let name = names.split(' ').slice(0, 2).join(' ') // first 2 words in `names` string

  let params = {
    TableName: 'Resumes',
    Item: {
      'id': file.filename,
      'name': name,
      'phone': phone,
      'email': email,
      'words': words
    }
  };

  try {
    const data = await dynamoDb.put(params).promise();
    console.log("Item added successfully: ", data);
  } catch (err) {
    console.error("Error adding item: ", err);
  }
}


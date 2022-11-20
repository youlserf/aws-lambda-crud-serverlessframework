const { v4 } = require("uuid");
const AWS = require("aws-sdk");
//Usando middleware
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

const addTask = async (e) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { title, description } = e.body;
    const createdAt = new Date();
    const id = v4();

    const newTask = {
      id,
      title,
      description,
      createdAt,
      done: false,
    };
    await dynamodb
      .put({
        TableName: "TaskTable",
        Item: newTask,
      })
      .promise();

    return {
      status: 200,
      body: JSON.stringify(newTask),
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addTask: middy(addTask).use(jsonBodyParser()) };

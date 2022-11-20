const AWS = require("aws-sdk");

const deleteTask = async (e) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = e.pathParameters;

    await dynamodb
      .delete({
        TableName: "TaskTable",
        Key: { id },
      })
      .promise();

    return {
      status: 200,
      body: {
        message: "Task deleted",
      },
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteTask,
};

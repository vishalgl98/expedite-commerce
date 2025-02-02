import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import dynamoDbConfig from 'common/config/dynamodb.config.mjs';
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const { ProductId, ...updateFields } = event.arguments.input;
    if (!ProductId) {
      return {
        statusCode: 0,
        message: 'Product ID is required'
      };
    }
    const updateExpression = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};
    Object.entries(updateFields).forEach(([key, value]) => {
      updateExpression.push(`#${key} = :${key}`);
      expressionAttributeValues[`:${key}`] = value;
      expressionAttributeNames[`#${key}`] = key;
    });
    const params = {
      TableName: dynamoDbConfig.Products,
      Key: {
        ProductId: ProductId
      },
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: 'ALL_NEW'
    };
    const { Attributes } = await docClient.send(new UpdateCommand(params));
    return {
      statusCode: 1,
      message: 'Product updated successfully',
      data: Attributes
    };
  } catch (error) {
    return await graphqlErrorHandler(
      { statusCode: 0, message: error.message },
      event,
      context,
    );
  }
};

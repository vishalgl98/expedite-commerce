import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import dynamoDbConfig from 'common/config/dynamodb.config.mjs';
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const { ProductId } = event.arguments.input;
    if (!ProductId) {
      return {
        statusCode: 0,
        message: 'Product ID is required'
      };
    }
    const params = {
      TableName: dynamoDbConfig.Products,
      Key: {
        ProductId: ProductId
      }
    };
    await docClient.send(new DeleteCommand(params));
    return {
      statusCode: 1,
      message: 'Product deleted successfully'
    };
  } catch (error) {
    return await graphqlErrorHandler(
      { statusCode: 0, message: error.message },
      event,
      context,
    );
  }
};

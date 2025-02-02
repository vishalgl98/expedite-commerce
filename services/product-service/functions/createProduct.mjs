import { graphqlErrorHandler } from 'common/utils/handlers.util.mjs';
import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import dynamoDbConfig from 'common/config/dynamodb.config.mjs';
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
    const { Name, Description, Price, Category, Stock } = event.arguments.input;
    try {
        const productId = uuidv4();
        const product = {
            ProductId: productId,
            Name: Name,
            Description: Description,
            Price: Price,
            Category: Category,
            Stock: Stock,
            CreatedAt: new Date().toISOString(),
        };
        await docClient.send(
            new PutCommand({
                TableName: dynamoDbConfig.Products,
                Item: product
            })
        );
        return {
            statusCode: 1,
            message: "Product created successfully",
            data: product
        };
    } catch (error) {
        return await graphqlErrorHandler(
            { statusCode: 0, message: error.message },
            event,
            context,
        );
    }
};

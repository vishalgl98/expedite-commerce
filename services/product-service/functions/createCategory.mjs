import { graphqlErrorHandler } from 'common/utils/handlers.util.mjs';
import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import dynamoDbConfig from 'common/config/dynamodb.config.mjs';
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
    const { Name, Description, ParentId } = event.arguments.input;
    try {
        const TaxonomyId = uuidv4();
        const category = {
            TaxonomyId: TaxonomyId,
            Name: Name,
            Description: Description,
            ParentId: ParentId,
            CreatedAt: new Date().toISOString(),
        };
        await docClient.send(
            new PutCommand({
                TableName: dynamoDbConfig.ProductTaxonomyAttributes,
                Item: category
            })
        );
        return {
            statusCode: 1,
            message: "Category created successfully",
            data: category
        };
    } catch (error) {
        return await graphqlErrorHandler(
            { statusCode: 0, message: error.message },
            event,
            context,
        );
    }
};

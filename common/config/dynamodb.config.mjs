const env = process.env;
const environment = env.ENV;

const dynamoDbConfig = {
  Products: `Products-${environment}`,
  ProductTaxonomyAttributes: `ProductTaxonomyAttributes-${environment}`,
};

export default dynamoDbConfig;

const env = process.env;

const awsConfig = {
  region: env.AWS_REGION,
  accountId: env.ACCOUNT_ID,
  accessKeyId: env.AWS_ACS_KEY_ID,
  secretAccessKey: env.AWS_SCRT_ACS_KEY,
};

export default awsConfig;

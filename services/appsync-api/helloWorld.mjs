export const handler = async (event, context) => {
  try {
    return { message: 'All ok!' };
  } catch (error) {
    console.log('Exception in health:', error);
    return { 
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

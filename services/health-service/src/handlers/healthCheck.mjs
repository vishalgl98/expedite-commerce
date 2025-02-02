const healthCheck = async (event, context) => {
  try {
    return { 
      statusCode: 200,
      body: JSON.stringify({ message: 'All ok!' })
    };
  } catch (error) {
    console.log('Exception in health:', error);
    return { 
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

export const handler = healthCheck;

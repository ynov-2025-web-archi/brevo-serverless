export const transactionalEmailHandler = async (event) => {
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Check if this is an API Gateway event
    if (event.httpMethod) {
        if (event.httpMethod !== 'POST') {
            throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
        }
    } else {
        console.log('No httpMethod found in event, treating as direct invocation');
    }

    // Get body from the event
    let body;
    if (event.body) {
        // If body is a string, parse it
        if (typeof event.body === 'string') {
            body = JSON.parse(event.body);
        } else {
            // If body is already an object
            body = event.body;
        }
    } else {
        // If no body, use the event itself as the data
        body = event;
    }
    
    console.log('body:', body);

    try {
        console.log("Success", body);
      } catch (err) {
        console.log("Error", err.stack);
      }

    const response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path || 'direct invocation'} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};

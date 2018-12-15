const dialogflow = require('dialogflow');
const uuid = require('uuid');

/**
 * Sends a query to the dialogflow agent, and returns the query result.
 * @param clientRequest
 */
module.exports = async function (clientRequest) {
    // A unique identifier for the given session
    const sessionId = uuid.v4();
    // From Firebase console
    const projectId = 'tesiagent-5723f';
    

    // Creates a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // Default server response
    const response = {
        body: '',
        from: 'ChatBot',
        type: "text"
    }

    // Text query request
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: clientRequest.body,
                // The language used by the client (en-US)
                languageCode: 'en-US',
            },
        },
    };

    // Sends request and logs result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }

    // Finalizes the message to send to the client based on the agent intent
    if (result.intent.displayName == 'Image Intent') {
        response.type = "image";
        response.body = result.fulfillmentMessages[0].card.imageUri;
    } else {
        response.body = result.fulfillmentText;
    }
    
    return response;
}
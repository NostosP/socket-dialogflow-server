const dialogflow = require('dialogflow');
const uuid = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
module.exports = async function (message) {
    // A unique identifier for the given session
    const sessionId = uuid.v4();
    const projectId = 'tesiagent-5723f';
    

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // Create new default message
    const response = {
        body: '',
        from: 'ChatBot',
        type: "text"
    }

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: message.body,
                // The language used by the client (en-US)
                languageCode: 'en-US',
            },
        },
    };

    // Send request and log result
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

    // Finalize message to send to client based on intent
    if (result.intent.displayName == 'Image Intent') {
        response.type = "image";
        response.body = result.fulfillmentMessages[0].card.imageUri;
    } else {
        response.body = result.fulfillmentText;
    }
    
    return response;
}
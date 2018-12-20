const dialogflow = require('dialogflow');
const uuid = require('uuid');
var clientRes = require('./models/clientResponse'),
    dialogflowReq = require('./models/dialogflowRequest');

// From Firebase console
const projectId = 'tesiagent-5723f';

/**
 * Sends a query to the dialogflow agent, and returns the query result.
 * @param clientRequest
 */
exports. sendMessage = async function(clientRequest) {

    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Creates a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const request = dialogflowReq.request;
    request.session = sessionPath;
    request.queryInput.text.text = clientRequest.body

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

    // Constructs the message to send to the client based on the agent intent
    var response = clientRes.response;
    if (result.intent.displayName == 'Image Intent') {
        response.type = 'image';
        response.body = result.fulfillmentMessages[0].card.imageUri;
    } else {
        response.body = result.fulfillmentText;
        response.type = 'text';
    }
    
    return response;
}

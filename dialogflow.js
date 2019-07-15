const dialogflow = require('dialogflow'),
    uuid = require('uuid'),
    isEmpty = require('./isEmpty');
    convertPerformance = require('./convertPerformancePayload')
var clientRes = require('./models/clientResponse');

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
    const sessionClient = new dialogflow.v2.SessionsClient();

    // Builds dialogflow request
    const formattedSession = sessionClient.sessionPath(projectId, sessionId);
    const queryInput = {text: {
            text: clientRequest.body,
            languageCode: 'en-GB'
        }
    };
    const request = {
        session: formattedSession,
        queryInput: queryInput
    }

    // Sends request and logs result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log('Response: ', JSON.stringify(result, null, 2));

    // Constructs the message to send to the client based on the agent action
    var response = clientRes.response();
    if (result.action === "ComparePerformance") {
        result.fulfillmentMessages.forEach(m => {
            response.body.push(convertPerformance.convert(m.payload.fields));
        }); 
        response.type = 'performance';
    } else {
        response.body = result.fulfillmentText;
        response.type = 'text';
    }

    return response;
}

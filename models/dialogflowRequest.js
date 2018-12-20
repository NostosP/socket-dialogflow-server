// Text query request
exports.request = {
    session: 'sessionPath',
    queryInput: {
        text: {
            // The query to send to the dialogflow agent
            text: 'clientRequest.body',
            // The language used by the client (en-US)
            languageCode: 'en-US',
        },
    },
};
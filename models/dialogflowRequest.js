/**
 * Default dialogflow request
 */
exports.request = function() {
    var req = {
        session: 'sessionPath',
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: 'clientRequest.body',
                // The language used by the client (en-US)
                languageCode: 'en-US',
            },
        },
        queryParams: {
            timeZone: 'asd',
            payload: {
                fields: {
                    token: {
                        stringValue: 'token',
                        kind: 'stringValue'
                    }
                }
            }           
        }
    }
    return req;
}
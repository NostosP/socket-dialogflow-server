const bot = 'ChatBot';

/**
 * Default client response
 */
exports.response = function() {
    var message = {
        body: '',
        from: bot,
        type: ''
    }
    return message;
}

/**
 * Default error client response
 */
exports.errorResponse = function() {
    var message = {
        body: 'Something went wrong!',
        from: bot,
        type: 'text'
    }
    return message;
}
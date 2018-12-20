/**
 * Default client response
 */
exports.response = function() {
    var message = {
        body: '',
        from: 'ChatBot',
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
        from: 'ChatBot',
        type: 'text'
    }
    return message;
}
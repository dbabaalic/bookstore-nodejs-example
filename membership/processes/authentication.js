let Authentication = function() {

    function authenticate() {
        return {success: true}
    }
    
    return {
        authenticate
    }
}

module.exports = Authentication;
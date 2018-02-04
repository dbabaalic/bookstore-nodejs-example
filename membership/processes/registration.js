var User = require('../models/user');

var RegistrationResult = function(args) {
    let result = {};
    result.success = args.success || false;
    result.message = args.message || '';
    result.user = args.user;
    return result;
}

let Registration = function() {

    function registerOk(user) {
        return new RegistrationResult({
            success: true,
            message: 'Successfully registered user',
            user: user
        });
    }

    function registerNotOk (message) {
        return new RegistrationResult({
            success: false,
            message: message,
            user: null
        });
    }

    function registerMember (application) {
        if(!application.isValidEmail()){
            return registerNotOk('Email is required');
        }
        if(!application.passwordMatch()){
            return registerNotOk('Password missmatch');
        }

        let user = new User({
            email: application.email,
            status: 'approved'
        });
        return registerOk(user);
    }

    let registration = {
        registerMember
    }

    return registration;
    
}

module.exports = Registration;
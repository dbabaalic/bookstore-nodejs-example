var assert = require('assert');

function RegistrationApplication (args) {

    var application = {};
    application.email = args.email;
    application.password = args.password;
    application.confirmPassword = args.confirmPassword;

    application.passwordMatch = function() {
        return args.password === args.confirmPassword;
    }
    application.isValidEmail = function() {
        return args.email !== null && args.email !== '';
    }
    return application;
}

module.exports = RegistrationApplication;
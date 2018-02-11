var User = require('../models/user');

var RegistrationResult = function(args) {
    let result = {};
    result.success = args.success || false;
    result.message = args.message || '';
    result.user = args.user;
    return result;
}

let Registration = function(db) {

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

    function isUniqueEmail(email) {
        return new Promise((resolve, reject) => {
            db.users.count({ email }, function (err, numberOfUsers) {
                if(err) reject(err);
                resolve(numberOfUsers < 1);
            });
        });
    }

    function createUser(user) {
        return new Promise((resolve, reject) => {
            db.users.insert(user, function (err, user) {
                if(err) reject(err);
                resolve(user);
            });
        });
    }

    async function registerMember (application) {
        if(!application.isValidEmail()){
            return registerNotOk('Email is required');
        }
        if(!application.passwordMatch()){
            return registerNotOk('Password missmatch');
        }

        let isUniqueEmailResult = await isUniqueEmail(application.email);
        
        if(!isUniqueEmailResult){
            return registerNotOk('Email is already taken');
        }

        let user = new User({
            email: application.email,
            status: 'approved'
        });
        let createdUser = await createUser(user);
        return registerOk(createdUser);
    }

    let registration = {
        registerMember
    }

    return registration;
    
}

module.exports = Registration;
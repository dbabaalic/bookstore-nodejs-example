var Registration = require('./processes/registration');
var RegistrationApplication = require('./models/registrationApplication');
var Authentication = require('./processes/authentication');
var Datastore = require('nedb');

var db = {};
db.users = new Datastore();

var Membership = function () {

    async function registerMember (newApplication){
      var registration = new Registration(db);
      var application = new RegistrationApplication(newApplication);
      return await registration.registerMember(application);
    };

    async function authenticate(email) {
        var authentication = new Authentication(db);
        return await authentication.authenticate(email);
    };

    return {
        registerMember,
        authenticate
    };
};

module.exports = Membership;
var Registration = require('./processes/registration');
var RegistrationApplication = require('./models/registrationApplication');

var Datastore = require('nedb');

var db = {};
db.users = new Datastore();

var Membership = function () {
    async function registerMember (newApplication){
      var registration = new Registration(db);
      var application = new RegistrationApplication(newApplication);
      return await registration.registerMember(application);
    };

    let membership = {
        registerMember: registerMember
    }

    return membership;
};

module.exports = Membership;
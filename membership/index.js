var Registration = require('./processes/registration');
var RegistrationApplication = require('./models/registrationApplication');

var Membership = function () {

    function registerMember (newApplication){
      var registration = new Registration();
      var application = new RegistrationApplication(newApplication);
      return registration.registerMember(application);
    };

    let membership = {
        registerMember: registerMember
    }

    return membership;
};

module.exports = Membership;
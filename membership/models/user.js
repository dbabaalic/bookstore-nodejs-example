var assert = require('assert');

function User(args) {
    assert.ok(args.email, 'Email is required');

    var user = {};
    user.email = args.email;
    user.status = args.status || 'pending';
    user.dateCreated = args.dateCreated || new Date();
    return user;
}

module.exports = User;
var Registration = require('../processes/registration');
var RegistrationApplication = require('../models/registrationApplication');
var assert = require('assert');
var Datastore = require('nedb');

describe('Registration', () => {

    let registration = {};
    var db = {};
    db.users = new Datastore();
    before(() => {
        registration = new Registration(db);
    });

    describe('is successfull', () => {
        
        var result = {};

        before(async () => {
            let application = new RegistrationApplication({
                email: 'damirb964@gmail.com',
                password: 'pass123',
                confirmPassword: 'pass123'
            })
            result = await registration.registerMember(application);
        })

        it('has success status and message', () => {
            assert.ok(result.success);
            assert.equal(result.message, 'Successfully registered user');
        });

        it('email is damirb964@gmail.com', () => {
            assert.equal(result.user.email, 'damirb964@gmail.com');
        })

        it('status is approved', () => {
            assert.equal(result.user.status, 'approved');
        })
    })

    describe('password missmatch', () => {
        var result = {};
        before(async () => {
            let application = new RegistrationApplication({
                email: 'damirb964@gmail.com',
                password: 'pass123',
                confirmPassword: 'asd'
            })
            result = await registration.registerMember(application);
        })
        it('has failed status and message', () => {
            assert.ok(!result.success);
            assert.equal(result.message, 'Password missmatch');
        });
    })

    describe('email is empty or null', () => {
        var result = {};
        before(async () => {
            let application = new RegistrationApplication({
                email: '',
                password: 'pass123',
                confirmPassword: 'pass123'
            })
            result = await registration.registerMember(application);
        })
        it('has failed status and message', () => {
            assert.ok(!result.success);
            assert.equal(result.message, 'Email is required');
        });
    })

    describe('email is not unique', () => {
        var result = {};
        before(async () => {
            let application = new RegistrationApplication({
                email: 'damirb964@gmail.com',
                password: 'pass123',
                confirmPassword: 'pass123'
            })
            await registration.registerMember(application);
            result = await registration.registerMember(application);
        })
        it('has failed status and message', () => {
            assert.ok(!result.success);
            assert.equal(result.message, 'Email is already taken');
        });
    })
})
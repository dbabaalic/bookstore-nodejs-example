var Registration = require('../processes/registration');
var RegistrationApplication = require('../models/registrationApplication');
var assert = require('assert');

describe('Registration', () => {

    let registration = {};

    before(() => {
        registration = new Registration();
    });

    describe('is successfull', () => {
        
        var result = {};

        before(() => {
            let application = new RegistrationApplication({
                email: 'damirb964@gmail.com',
                password: 'pass123',
                confirmPassword: 'pass123'
            })
            result = registration.registerMember(application);
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
        before(() => {
            let application = new RegistrationApplication({
                email: 'damirb964@gmail.com',
                password: 'pass123',
                confirmPassword: 'asd'
            })
            result = registration.registerMember(application);
        })
        it('has failed status and message', () => {
            assert.ok(!result.success);
            assert.equal(result.message, 'Password missmatch');
        });
    })

    describe('email is empty or null', () => {
        var result = {};
        before(() => {
            let application = new RegistrationApplication({
                email: '',
                password: 'pass123',
                confirmPassword: 'pass123'
            })
            result = registration.registerMember(application);
        })
        it('has failed status and message', () => {
            assert.ok(!result.success);
            assert.equal(result.message, 'Email is required');
        });
    })
})
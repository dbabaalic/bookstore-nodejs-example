var Authentication = require('../processes/authentication');
var assert = require('assert');
var should = require('should');
var Datastore = require('nedb');

describe('Authentication', () => {

    let authentication = {};
    var db = {};
    db.users = new Datastore();

    before(() => {
        db.users.insert({ email: 'damirb964@gmail.com' }, function (err, user) {});
        authentication = new Authentication(db);
    });

    describe('is successfull', () => {

        let result = {};
        
        before(async () => {
            result = await authentication.authenticate('damirb964@gmail.com');
        })

        it('has success status', () => {
            assert.ok(result.success);
        });

        it('has success message', () => {
            assert.equal(result.message, 'Successfully authenticated user');
        });

        it('has token', () => {
            should.exist(result.token);
        });

    })

    describe('email dont exist', () => {
        let result = {};
        
        before(async () => {
            result = await authentication.authenticate('unexisting@email.com');
        })

        it('has failed status', () => {
            assert.ok(!result.success);
        });

        it('has failed message', () => {
            assert.equal(result.message, 'Email dont exist');
        });

        it('dont have token', () => {
            assert.ok(!result.token);
        });
    })
})
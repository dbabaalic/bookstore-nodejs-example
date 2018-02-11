var Authentication = require('../processes/authentication');
var assert = require('assert');

describe('Authentication', () => {

    let authentication = {};

    before(() => {
        authentication = new Authentication();
    });

    describe('is successfull', () => {

        let result = {};
        
        before(() => {
            result = authentication.authenticate();
        })

        it('has success status', () => {
            assert.ok(result.success);
        })

    })
})
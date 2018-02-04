var assert = require('assert');
var should = require('should');
var User = require('../models/user');

describe('User', () => {

  describe('defaults', () => {

    let user = {};

    before(() => {
      user = new User({email: 'damirb964@gmail.com'});
    })

    it('email is damirb964@gmail.com', () => {
      assert.equal(user.email, 'damirb964@gmail.com');
    });

    it('status is pending', () => {
      assert.equal(user.status, 'pending')
    });

    it('has dateCreated defined', () => {
      user.dateCreated.should.be.defined;
    })

  });
});
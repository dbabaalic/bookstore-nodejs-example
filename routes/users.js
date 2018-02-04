const express = require('express');
const router = express.Router();
const Membership = require('membership');

router.post('/register', (req, res, next) => {
    let newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    };
    
    var MembershipObj = new Membership();
    let result = MembershipObj.registerMember(newUser);
    res.json(result);
});

module.exports = router;
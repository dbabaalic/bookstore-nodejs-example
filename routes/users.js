const express = require('express');
const router = express.Router();
const Membership = require('membership')();

router.post('/register', async (req, res, next) => {
    let result = await Membership.registerMember(req.body);
    res.json(result);
});

router.post('/authenticate', async (req, res, next) => {
    let result = await Membership.authenticate(req.body.email);
    res.json(result);
});

module.exports = router;
const express = require('express');
const { userDb } = require('../db/user-db');
const { checkAuth } = require('../middleware/checkAuth');
const { User } = require('../models/user');
const router = express.Router();

router.post('/check', checkAuth, async (req, res, next) => {
    let {user} = req.body;
    let newUser = new User(user);
    try{
        let userData = await userDb.checkUser(newUser);
        return res.json({
            message: 'Found User',
            user:userData
        });
    }
    catch(e){
        res.err = e;
        console.error(e);
        next();
    }
})

module.exports = {router};
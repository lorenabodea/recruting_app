const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const authorize = require('../../_helpers/authorize')
const Role = require('../../_helpers/role');
var dbConn = require('../../config/db.config');

const config = require('../../config/configAuth.json');
const jwt = require('jsonwebtoken');

// routes
router.post('/authenticate', authenticate);     // public route
router.get('/', authorize(Role.Admin), getAll); // admin only
router.get('/:id', authorize(), getById);       // all authenticated users
module.exports = router;

function authenticate(req, response, next) {
    let username = req.body.username;
    let password = req.body.password;
    dbConn.query("Select * from users", function (err, res) {
        let users;
        if (err) {
            console.log("error: ", err);
            return null;
        }
        else {
            users = res;
            const index = users.findIndex(u => u.username === username && u.password === password);
            let user = users[index];
            if (user) {
                const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
                const { password, ...userWithoutPassword } = user;
                console.log(userWithoutPassword);
                response.json({
                    ...userWithoutPassword,
                    token
                })  
            } else {
                response.status(400).json({ message: 'Username or password is incorrect' })
            }
        }
    });
}


function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
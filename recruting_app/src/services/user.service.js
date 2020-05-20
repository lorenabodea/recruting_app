'use strict';

const config = require('../../config/configAuth.json');
const jwt = require('jsonwebtoken');
const Role = require('../../_helpers/role');
const User = require('../models/user.model');


async function getUsers() {
    let users;
    dbConn.query("Select * from users", function (err, res) {
        if (err) {
            console.log("error: ", err);
            return null;
        }
        else {
            console.log('users : ', res);
            users = res;
        }
    });
    return users;
}

async function authenticate({ username, password }) {
    //console.log(username, password);
    // const users = [
    //     { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    //     { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
    // ];


   

}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = {
    authenticate,
    getAll,
    getById
};
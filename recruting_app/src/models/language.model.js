'use strict';
var dbConn = require('../../config/db.config');
// Language object create
var Language = function (lang) {
    this.language = lang.language,
        this.user_id = lang.user_id
}

Language.create = function (newLanguage, result) {
    dbConn.query("INSERT INTO languages set ?", newLanguage, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Language.findByUserId = function (userId, result) {
    dbConn.query("Select * from languages where user_id = ? ", userId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Language;
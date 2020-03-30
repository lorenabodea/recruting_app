'use strict';
var dbConn = require('../../config/db.config');
// Certificate object create
var Certificate = function (certificate) {
  this.certificate = certificate.certificate,
    this.user_id = certificate.user_id
}

Certificate.create = function (newCertificate, result) {
  dbConn.query("INSERT INTO certificates set ?", newCertificate, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Certificate.findByUserId = function (userId, result) {
  dbConn.query("Select * from certificates where user_id = ? ", userId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};

module.exports = Certificate;

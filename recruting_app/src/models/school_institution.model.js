'use strict';
var dbConn = require('../../config/db.config');
// School_institution object create
var School_institution = function (school_institution) {
    this.name = school_institution.name,
        this.from_year = school_institution.from_year,
        this.to_year = school_institution.to_year,
        this.user_id = school_institution.user_id
}

School_institution.create = function (newSchool_institution, result) {
    dbConn.query("INSERT INTO school_institutions set ?", newSchool_institution, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

School_institution.findByUserId = function (userId, result) {
    dbConn.query("Select * from school_institutions where user_id = ? ", userId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

School_institution.findAll = function (result) {
    dbConn.query("Select * from school_institutions", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      }
      else {
        console.log('school_institutions : ', res);
        result(null, res);
      }
    });
  };

module.exports = School_institution;
'use strict';
var dbConn = require('../../config/db.config');
//Recruit object create
var Recruit = function (recruit) {
  this.first_name = recruit.first_name;
  this.last_name = recruit.last_name;
  this.email = recruit.email;
  this.phone = recruit.phone;
  this.birthday = new Date();
  this.photo = recruit.photo;
  this.favourite = recruit.favourite;
  this.salary_expectation = recruit.salary_expectation;
};
Recruit.create = function (newRecruit, result) {
  dbConn.query("INSERT INTO recruits set ?", newRecruit, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Recruit.findById = function (id, result) {
  dbConn.query("Select * from recruits where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};
Recruit.findAll = function (result) {
  dbConn.query("Select * from recruits", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('recruits : ', res);
      result(null, res);
    }
  });
};
Recruit.update = function (id, photo, result) {
  dbConn.query("UPDATE recruits SET photo=? WHERE id = ?", [photo, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
Recruit.setFavourite = function (id, value, result) {
  dbConn.query("UPDATE recruits SET favourite=? WHERE id = ?", [value, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
Recruit.delete = function (id, result) {
  dbConn.query("DELETE FROM recruits WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log("deleted");
      result(null, res);
    }
  });
};
module.exports = Recruit;
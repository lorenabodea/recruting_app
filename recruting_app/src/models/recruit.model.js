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
Recruit.update = function (id, recruit, result) {
  dbConn.query("UPDATE recruits SET first_name=?,last_name=?,email=?,phone=?,birthday=?,photo=? WHERE id = ?", [recruit.first_name, recruit.last_name, recruit.email, recruit.phone, recruit.birthday, recruit.photo, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
Recruit.setFavourite = function (id, result) {
  dbConn.query("UPDATE recruits SET favourite=? WHERE id = ?", [1, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
Recruit.removeFavourite = function (id, result) {
  dbConn.query("UPDATE recruits SET favourite=? WHERE id = ?", [0, id], function (err, res) {
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
      result(null, res);
    }
  });
};
module.exports = Recruit;
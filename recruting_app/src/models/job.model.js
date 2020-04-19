'use strict';
var dbConn = require('../../config/db.config');
// Job object create
var Job = function(job) {
    this.position = job.position,
    this.from_year = job.from_year,
    this.to_year = job.to_year,
    this.user_id = job.user_id
}

Job.create = function (newJob, result) {
    dbConn.query("INSERT INTO jobs set ?", newJob, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null); 
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Job.findByUserId = function (userId, result) {
    dbConn.query("Select * from jobs where user_id = ? ", userId, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
};

Job.findAll = function (result) {
  dbConn.query("Select * from jobs", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('jobs : ', res);
      result(null, res);
    }
  });
};

module.exports = Job;
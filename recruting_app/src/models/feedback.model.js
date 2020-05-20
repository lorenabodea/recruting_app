'use strict';
var dbConn = require('../../config/db.config');

var Feedback = function (feedback) {
    this.feedback = feedback.feedback,
    this.recruit_id = feedback.recruit_id,
    this.recruiter_id = feedback.recruiter_id
};
Feedback.create = function (newFeedback, result) {
    dbConn.query("INSERT INTO feedbacks set ?", newFeedback, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

module.exports = Feedback;
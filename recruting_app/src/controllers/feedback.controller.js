'use strict';
const Feedback = require('../models/feedback.model');

exports.create = function (req, res) {
    const feedback = new Feedback(req.body);
    Feedback.create(feedback, function (err, recruit) {
        if (err)
            res.send(err);
        res.json(recruit);
    });
};
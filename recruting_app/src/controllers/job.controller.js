'use strict';
const Job = require('../models/job.model');


exports.findByUserId = function (req, res) {
    Job.findByUserId(req.params.id, function (err, recruit) {
        if (err)
            res.send(err);
        res.json(recruit);
    });
};
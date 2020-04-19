'use strict';
const Job = require('../models/job.model');


exports.findByUserId = function (req, res) {
    Job.findByUserId(req.params.id, function (err, recruit) {
        if (err)
            res.send(err);
        res.json(recruit);
    });
};

exports.findAll = function (req, res) {
    Job.findAll(function (err, response) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', response);
        res.send(response);
    })
};

'use strict'
const School_institution = require('../models/school_institution.model');


exports.findByUserId = function (req, res) {
    School_institution.findByUserId(req.params.id, function (err, recruit) {
        if (err)
            res.send(err);
        res.json(recruit);
    });
};

exports.findAll = function (req, res) {
    School_institution.findAll(function (err, response) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', response);
        res.send(response);
    })
};
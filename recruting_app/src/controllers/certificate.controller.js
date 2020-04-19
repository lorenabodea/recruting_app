'use strict';
const Certificate = require('../models/certificate.model');


exports.findByUserId = function (req, res) {
    Certificate.findByUserId(req.params.id, function (err, recruit) {
        if (err)
            res.send(err);
        res.json(recruit);
    });
};

exports.findAll = function (req, res) {
    Certificate.findAll(function (err, response) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', response);
        res.send(response);
    })
};

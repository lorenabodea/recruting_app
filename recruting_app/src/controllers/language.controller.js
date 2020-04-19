'use strict';
const Language = require('../models/language.model');


exports.findByUserId = function (req, res) {
    Language.findByUserId(req.params.id, function (err, recruit) {
        if (err)
            res.send(err);
        res.json(recruit);
    });
};

exports.findAll = function (req, res) {
    Language.findAll(function (err, response) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', response);
        res.send(response);
    })
};
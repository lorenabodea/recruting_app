'use strict';
const Certificate = require('../models/certificate.model');


exports.findByUserId = function (req, res) {
    Certificate.findByUserId(req.params.id, function (err, recruit) {
        if (err)
            res.send(err);
        res.json(recruit);
    });
};
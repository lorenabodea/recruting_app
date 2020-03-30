'use strict'
const School_institution = require('../models/school_institution.model');


exports.findByUserId = function (req, res) {
    School_institution.findByUserId(req.params.id, function (err, recruit) {
        if (err)
            res.send(err);
        res.json(recruit);
    });
};
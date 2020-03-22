'use strict'
School_institution = require('../models/school_institution.model');


exports.findByUserId = function (req, res) {
    School_institution.findByUserId(req.params.user_id, function (err, recruit) {
        if (err)
            res.send(err);
        res.json(recruit);
    });
};
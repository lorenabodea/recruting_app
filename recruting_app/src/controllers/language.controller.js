'use strict';
const Language = require('../models/language.model');


exports.findByUserId = function (req, res) {
    Language.findByUserId(req.params.user_id, function (err, recruit) {
        if (err)
            res.send(err);
        res.json(recruit);
    });
};
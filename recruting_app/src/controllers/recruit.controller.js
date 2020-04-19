'use strict'
const Recruit = require('../models/recruit.model');
const Certificate = require('../models/certificate.model');
const Job = require('../models/job.model');
const Language = require('../models/language.model');
const SchoolInstitution = require('../models/school_institution.model');
const userFiles = 'src/public/images/profiles/';
const fs = require('fs');
const config = require('../../config/configAuth.json');
const jwt = require('jsonwebtoken');
const Role = require('../../_helpers/role');
const path = require("path");

exports.findAll = function (req, res) {
  Recruit.findAll(function (err, recruit) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', recruit);
    res.send(recruit);
  })
};

exports.create = function (req, res) {

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    console.log(req.body);
    const new_recruit = new Recruit({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      photo: 'location',
      favourite: 0,
      salary_expectation: req.body.salary
    });

    Recruit.create(new_recruit, function (err, recruit) {
      if (err) {
        res.send(err);
      }
      //add languages
      if (req.body.languages) {
        for (let count = 0; count < req.body.languages.length; count++) {
          const language = new Language({
            language: req.body.languages[count].language,
            user_id: recruit
          });

          Language.create(language, function (err, lang) {
            if (err) {
              res.send(err);
            }
          });
        }
      }

      //add certificates
      if (req.body.certificates) {
        for (let count = 0; count < req.body.certificates.length; count++) {
          const certificate = new Certificate({
            certificate: req.body.certificates[count].certificate,
            user_id: recruit
          });

          Certificate.create(certificate, function (err, certificate) {
            if (err) {
              res.send(err);
            }
          });
        }
      }

      //add job experience
      if (req.body.jobs) {
        for (let count = 0; count < req.body.jobs.length; count++) {
          const job = new Job({
            position: req.body.jobs[count].job,
            from_year: req.body.jobs[count].fromJob,
            to_year: req.body.jobs[count].toJob,
            user_id: recruit
          });

          Job.create(job, function (err, job) {
            if (err) {
              res.send(err);
            }
          });
        }
      }
      //add schools
      if (req.body.institutions) {
        for (let count = 0; count < req.body.institutions.length; count++) {
          const institution = new SchoolInstitution({
            name: req.body.institutions[count].institution,
            from_year: req.body.institutions[count].from,
            to_year: req.body.institutions[count].to,
            user_id: recruit
          });

          SchoolInstitution.create(institution, function (err, school) {
            if (err) {
              res.send(err);
            }
          });
        }
      }
      res.json(recruit);
    });
  }
};

exports.findById = function (req, res) {
  Recruit.findById(req.params.id, function (err, recruit) {
    if (err)
      res.send(err);
    res.json(recruit);
  });
};

exports.update = function (req, res) {
  console.log("update");

  console.log("update", req.body);
  let location = "";
  if (req.files) {
    let image = req.files.photo;
    let relativeLocation = "../../frontend/recruitingapp/src/assets/profile-images/" + req.body.username + ".png";
    location = path.resolve(__dirname, relativeLocation);

    image.mv(location, err => {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  } else {
    console.log("nu e fisiere");
  }

  Recruit.update(req.params.id, location, function (err, recruit) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Recruit successfully updated' });
  });

};

exports.delete = function (req, res) {
  Recruit.delete(req.params.id, function (err, recruit) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Recruit successfully deleted' });
  });
};

exports.setFavourite = function (req, res) {
  console.log('controller');
  Recruit.setFavourite(req.params.id, req.body.val, function (err, recruit) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Recruit successfully set as favourite' });
  });
};


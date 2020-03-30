'use strict';
const Recruit = require('../models/recruit.model');
const Certificate = require('../models/certificate.model');
const Job = require('../models/job.model');
const Language = require('../models/language.model');
const SchoolInstitution = require('../models/school_institution.model');
const userFiles = 'src/public/images/profiles/';
const fs = require('fs');

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
  console.log('intra aici');
  console.log(req.body);
  const file = req.body.photo;
  console.log(req.body.photo);

 //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    // const file = req.files.photo;
    // const img_name = file.name;
    const new_recruit = new Recruit({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      photo: req.body.photo,
      favourite: 0
    });

    Recruit.create(new_recruit, function (err, recruit) {
      if (err) {
        res.send(err);
      }
      //add languages
      for( let count = 0;  count<req.body.languages.length; count++) {
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
      //add certificates
      for( let count = 0;  count<req.body.certificates.length; count++) {
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
 
    //add job experience
    for( let count = 0;  count<req.body.jobs.length; count++) {
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
    //add schools
    for( let count = 0;  count<req.body.institutions.length; count++) {
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
  });

    // if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png") {
    //   file.mv('src/public/images/profiles/'+file.name, function(err) {
    //     if(err) {
    //       return res.status(500).send(err);
    //     }

    //     const new_recruit = new Recruit({
    //       first_name: req.body.first_name,
    //       last_name: req.body.last_name,
    //       email: req.body.email,
    //       phone: req.body.phone,
    //       birthday: req.body.birthday,
    //       photo: img_name
    //     });

    //     Recruit.create(new_recruit, function (err, recruit) {
    //       if (err) {
    //         res.send(err);
    //       }
    //      // res.json({ error: false, message: "Recruit added successfully!", data: recruit });
    //     }).then(()=> {

    //     });
    //   });
    // } else {
    //   res.json({ error: false, message: "This format is not allowed , please upload file with '.png', jpg"});
    // }
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
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Recruit.update(req.params.id, new Recruit(req.body), function (err, recruit) {
      if (err)
        res.send(err);
      res.json({ error: false, message: 'Recruit successfully updated' });
    });
  }
};

exports.delete = function (req, res) {
  Recruit.delete(req.params.id, function (err, recruit) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Recruit successfully deleted' });
  });
};

exports.setFavourite = function (req, res) {
  Recruit.setFavourite(req.params.id, function (err, recruit) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Recruit successfully set as favourilte' });
  });
};

exports.removeFavourite = function (req, res) {
  Recruit.removeFavourite(req.params.id, function (err, recruit) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Recruit successfully removed from favourite' });
  });
};
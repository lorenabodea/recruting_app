'use strict';
const Recruit = require('../models/recruit.model');
const multiparty = require('multiparty');
var http = require('http');
var util = require('util');

exports.findAll = function (req, res) {
  Recruit.findAll(function (err, recruit) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', recruit);
    res.send(recruit);
  });
};

exports.create = function (req, res) {
  let form = new multiparty.Form();
  //   form.parse(req, function(err, fields, files) {
  //     // Object.values(fields).forEach(function(name) {
  //     //      console.log('got field named ' + name);
  //     //  });

  //      res.writeHead(200, {'content-type': 'text/plain'});
  //      res.write('received upload:\n\n');
  //      res.end(util.inspect({fields: fields, files: files}));
  //      const new_recruit = new Recruit(fields);
  //      Recruit.create(new_recruit, function(err, recruit) {
  //   if (err)
  //   res.send(err);
  //   res.json({error:false,message:"Recruit added successfully!",data:recruit});
  // });

  //  });
  const new_recruit = new Recruit(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log(req.body)
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Recruit.create(new_recruit, function (err, recruit) {
      if (err)
        res.send(err);
      res.json({ error: false, message: "Recruit added successfully!", data: recruit });
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
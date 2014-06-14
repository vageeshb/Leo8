'use strict';

var Company = require('../models/company'),
  helpers = require('../helpers/helpers');

module.exports = {
  index: function(req, res) {
    Company.find({}).sort({name: 1}).exec( function(err, companies) {
      if(err) console.log(err);
      res.render('company/index', {
        user: req.user,
        companies: companies
      });
    });
  },
  delete: function(req, res) {
    Company.remove({_id: req.params.id}, function(err, result) {
      if(err)
        res.json({ msg:'error: ' + err });
      else
        res.json({ msg: '' });
    });
  },
  getNew: function(req, res) {
    res.render('company/new', {user: req.user});
  },
  postNew: function(req, res) {
    var company = new Company(),
    contactsArr = [];

    company.name = req.body.name;
    company.description = req.body.desc;

    var contacts = req.body.contacts;
    
    if(contacts) {
      
      if(!(contacts instanceof Array))
        contactsArr.push(contacts);
      else
        contactsArr = contacts;

      contactsArr.forEach( function(contact) {
        var contactArr = contact.split(' - ');
        var repName, repDesignation, repComments;
        repName = contactArr[0];
        if(contactArr.length >= 2)
          repDesignation = contactArr[1];
        var repObj = {
          name: repName,
          designation : repDesignation
        };
        company.representatives.push(repObj);
      });
    }

    company.save(function(err, data) {
      if(err) { 
        var errorObj = {
            name: err.name,
            type: 'danger',
            message: err.message,
            errors: helpers.error(err)
          };
        res.render('company/new', {
          user: req.user, 
          error: errorObj 
        }); 
      } else {
        res.render('company/new', {
          user: req.user, 
          message: 'Company Contact added successfully!' 
        }); 
      }
    });

  },

  getEdit: function(req, res) {
    Company.findById(req.params.id, function(err, company) {
      res.render('company/edit', {
        user: req.user,
        company: company
      });
    });
  },

  putEdit: function(req, res) {

    var updatedCompany = new Company(),
    
    contactsArr = [];

    updatedCompany.name = req.body.name;
    updatedCompany.description = req.body.desc;

    var contacts = req.body.contacts;
    
    if (contacts) {
      
      if(!(contacts instanceof Array))
        contactsArr.push(contacts);
      else
        contactsArr = contacts;


      contactsArr.forEach( function(contact) {
        var contactArr = contact.split(' - ');
        var repName, repDesignation, repComments;
        repName = contactArr[0];
        if(contactArr.length >= 2)
          repDesignation = contactArr[1];
        var repObj = {
          name: repName,
          designation : repDesignation
        };
        updatedCompany.representatives.push(repObj);
      });
    }

    updatedCompany = updatedCompany.toObject();
    delete updatedCompany._id;

    Company.findByIdAndUpdate(req.params.id, updatedCompany, function(err, data) {
      if(err) { 
        var errorObj = {
            name: err.name,
            type: 'danger',
            message: err.message,
            errors: helpers.error(err)
          };
        res.render('company/edit', {
          user: req.user, 
          error: errorObj 
        }); 
      } else {
        // TODO
        res.redirect('/companies');
      }
    });
  },

  getReps: function(req, res) {
    
    Company.findById(req.params.id, function(err, company) {
      if(err)
        console.log(err);
      res.json(company.representatives);
    });
  }
};
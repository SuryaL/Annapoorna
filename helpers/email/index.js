'use strict';

const path                = require ('path');
const Promise             = require ('bluebird');
const nodemailer          = require ('nodemailer');
const ses                 = require ('nodemailer-ses-transport');

let transporter, template, subjects, config;

exports.init = function (cfg) {
  transporter = nodemailer.createTransport (cfg.smtp);
  template = require ('./template')(cfg);
  subjects = require (path.join(__dirname, 'template', 'subjects.json'));
  config = cfg;
};

/**
 * send - send an email from a generated template
 * @param  {Array/String} to        either a string or an array of strings
 * @param  {String}       emailName the email template name
 * @param  {Object}       data      the email template data to fill in
 * @return {Promise}                the blue bird promise after sending the email.
 */
exports.send = function (to, emailName, data, attachments = []) {
  return new Promise (function (resolve, reject) {

    // // So we can serve assets from the common/images/ folder on the web server
    // data.host     = config.sessionOptions.origin;

    let html            = template[emailName](data);
    let emailSubject    = subjects[emailName];
    let receivers       = (Array === to.constructor) ? to.join(', ') : to;

    let mailOptions = Object.assign({}, config.mailOptions, {
      to : receivers,
      subject : emailSubject,
      text : html.replace(/<\/?[^>]+(>|$)/g, ""),
      html : html,
      attachments : attachments
    });
    
    transporter.sendMail (mailOptions, function (err, info) {
      if (err) { return reject (err); }
      resolve (info.response);
    });
  });
};

const nodemailer = require('nodemailer');
const { host, port, user, pass } = require('../config/mail.json');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
    
  });

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./resources/mail/'),
    extName: '.html',
}))

  module.exports = transport;
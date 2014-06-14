'use strict';

var express = require('express'),
  favicon = require('static-favicon'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  flash = require('connect-flash'),
  methodOverride = require('method-override');

module.exports = function (app, passport) {

  // View Engine Setup
  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'jade');

  // Middle ware
  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(express.static(path.join(__dirname, '../public')));
  app.set('port', process.env.PORT || 3000);
  
};
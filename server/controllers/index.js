'use strict';

exports.index = function(req, res) {
  res.render('index', {page: 'index', title: 'Labs - Index'});
};

exports.socket = function(req, res) {
  res.render('socket', {page: 'socket', title: 'Labs - Socket'});
};

exports.canvas = function(req, res) {
  res.render('canvas', {page: 'canvas', title: 'Labs - Canvas'});
};

exports.angularUI = function(req, res) {
  res.render('angular-ui', {page: 'angular-ui', title: 'Labs - AngularUi'});
};

exports.realTime = function(req, res) {
  res.render('real-time', {page: 'real-time', title: 'Labs - Real-Time'});
};
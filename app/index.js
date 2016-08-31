var angular = require('angular');
var app = angular.module('app',[]);

var DataFactory = require('./factories/data-factory');
var MainCtrl = require('./controllers/main-ctrl');
var ShowMoreDir = require('./directives/show-more');
var ConfirmWindow = require('./directives/confirm-window');

app.constant('BASE_URL', 'https://todo-app-73d49.firebaseio.com/');
app.factory('dataFactory', DataFactory);
app.controller('MainCtrl', MainCtrl);
app.directive('showMore', ShowMoreDir);
app.directive('confirm', ConfirmWindow);
var angular = require('angular');
var app = angular.module('app',[]);

var MainCtrl = require('./controllers/main-ctrl');
var ShowMoreDir = require('./directives/show-more');

app.constant('BASE_URL', 'https://todo-app-73d49.firebaseio.com/');
app.controller('MainCtrl', MainCtrl);
app.directive('showMore', ShowMoreDir);
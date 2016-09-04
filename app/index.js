var angular = require('angular');
var app = angular.module('app',[]);

var DataService = require('./services/data.service'),
    DataFactory = require('./factories/data.factory'),
    MainCtrl = require('./controllers/main.controller'),
    TodoComment = require('./directives/todo-comment'),
    ShowMoreDir = require('./directives/show-more'),
    ConfirmWindow = require('./directives/confirm-window');

app.constant('BASE_URL', 'https://todo-app-73d49.firebaseio.com/');
app.factory('dataService', DataService);
app.factory('dataFactory', DataFactory);
app.controller('MainCtrl', MainCtrl);
app.directive('todoComment', TodoComment);
app.directive('showMore', ShowMoreDir);
app.directive('confirm', ConfirmWindow);
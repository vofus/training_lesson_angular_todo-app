function MainCtrl($scope, $http, $filter, BASE_URL, dataFactory) {

    $scope.todoArr = [];
    $scope.filteredTodos = [];
    $scope.users = [];
    $scope.currentItem = {};
    $scope.showForm = false;
    $scope.showAddForm = false;
    $scope.confirmTrigger = false;
    $scope.notifyTrigger = false;
    $scope.statesOfProgress = {
        'in_progress': 'В процессе',
        'partial': 'Частично',
        'done': 'Выполнено'
    };

    $scope.fetchData = function() {
        var promiseObj = dataFactory.processingData('GET', BASE_URL + '.json');
        promiseObj.then(function(data) {
            var todos = data["todos"],
                users = data["users"];
            // разбираем объект ответа на массивы
            for (key in todos) {
                todos[key].id = key;
                todos[key].date = new Date(todos[key].year, todos[key].month, todos[key].day);
                $scope.todoArr.push(todos[key]);
            }
            for (key in users) {
                users[key].id = key;
                $scope.users.push(users[key]);
            }
            $scope.filteredTodos = angular.copy($scope.todoArr);
            console.info('Data download from server');
            console.log('Массив задач: ', $scope.todoArr);
            console.log('Массив исполнителей: ', $scope.users);
        },
        function(status) {
            console.warn('Не удалось загрузить данные с сервера!', status);
        });
    };
    $scope.editOrCreate = function(item) {
        $scope.currentItem = item ? angular.copy(item) : {};
        $scope.showForm = true;
        console.log($scope.currentItem.date);
    };
    $scope.create = function(item) {
        var promiseObj = dataFactory.processingData('POST', BASE_URL + 'todos.json', item);
        promiseObj.then(function(response) {
            console.info('Data upload on server');
            console.log(response);
            for (key in response) {
                item.id = response[key];
                break;
            }
            $scope.todoArr.push(item);
            $scope.filteredTodos = angular.copy($scope.todoArr);
            console.log($scope.todoArr);
        },
        function(status) {
            console.warn('Не удалось создать новую запись на сервере!', status);
        });
    };
    $scope.update = function(item) {
        var editTodo = angular.copy(item);
        var promiseObj = dataFactory.processingData('PATCH', BASE_URL + 'todos/' + item.id + '.json', item);
        promiseObj.then(function() {
            console.log(editTodo);
            for (var i = 0; i < $scope.todoArr.length; i++) {
                if ($scope.todoArr[i].id == editTodo.id) {
                    $scope.todoArr.splice(i, 1, editTodo);
                    break;
                }
            }
            $scope.filteredTodos = angular.copy($scope.todoArr);
            console.log($scope.todoArr);
            $scope.showForm = false;
        },
        function(status) {
            console.warn('Обновление данных на сервере не удалось!', status);
        });
    };
    $scope.showConfirm = function(item) {
        $scope.currentItem = angular.copy(item);
        $scope.confirmTrigger = true;
    };
    $scope.showNotify = function() {
        $scope.notifyTrigger = !$scope.notifyTrigger;
    };
    $scope.delete = function(item) {
        var promiseObj = dataFactory.processingData('DELETE', BASE_URL + 'todos/' + item.id + '.json');
        promiseObj.then(function() {
            for (var i = 0; i < $scope.todoArr.length; i++) {
                if ($scope.todoArr[i].id == item.id) {
                    $scope.todoArr.splice(i, 1);
                    break;
                }
            }
            $scope.filteredTodos = angular.copy($scope.todoArr);
        },
        function(status) {
            console.warn('Не удалось удалить элемент!', status);
        });
        $scope.confirmTrigger = false;
    };
    $scope.saveEdit = function(item) {
        item.year = item.date.getFullYear();
        item.month = item.date.getMonth();
        item.day = item.date.getDate();
        item.strDate = $filter('date')(item.date, 'dd.MM.yyyy');

        if (angular.isDefined(item.id)) {
            $scope.update(item);
        } else {
            item.done = false;
            $scope.create(item);
        }
        $scope.showForm = false;
    };
    $scope.cancelEdit = function () {
        $scope.currentItem = {};
        $scope.showForm = false;
        $scope.confirmTrigger = false;
    };
    $scope.sortByName = function(reverse) {
        $scope.filteredTodos = $filter('orderBy')($scope.todoArr, 'name', reverse);
    };
    $scope.sortByDate = function(reverse) {
        $scope.filteredTodos = $filter('orderBy')($scope.todoArr, 'date', reverse);
    };
    $scope.stateFilter = function(state) {
        $scope.filteredTodos = $filter('filter')($scope.todoArr, {state: state});
        console.log($scope.filteredTodos);
    };

    $scope.fetchData();
}

module.exports = MainCtrl;
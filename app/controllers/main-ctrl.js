function MainCtrl($scope, $http, $filter, BASE_URL) {

    $scope.todoArr = [];
    $scope.users = [];
    $scope.currentItem = {};
    $scope.showForm = false;
    $scope.showAddForm = false;
    // $scope.statesOfProgress = [
    //     {type: 'in_progress', descr: 'В процессе'},
    //     {type: 'partial_done', descr: 'Выполнено частично'},
    //     {type: 'done', descr: 'Выполнено'}
    // ];
    $scope.statesOfProgress = {
        'in_progress': 'В процессе',
        'partial_done': 'Частично',
        'done': 'Выполнено'
    };

    $scope.fetchData = function() {
        $http.get(BASE_URL + '.json')
            .success(function(data) {
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
                console.info('Data download from server');
                console.log('Массив задач: ', $scope.todoArr);
                console.log('Массив исполнителей: ', $scope.users);
            })
            .error(function() {
                console.error('Не удалось загрузить данные с сервера!');
            });
    };
    $scope.editOrCreate = function(item) {
        $scope.currentItem = item ? angular.copy(item) : {};
        $scope.showForm = true;
        console.log($scope.currentItem.date);
    };
    $scope.create = function(item) {
        $http.post(BASE_URL + 'todos.json', item)
            .success(function(response) {
                console.info('Data upload on server');
                console.log(response);
                for (key in response) {
                    item.id = response[key];
                    break;
                }
                $scope.todoArr.push(item);
                console.log($scope.todoArr);
            })
            .error(function() {
                console.error('Не удалось создать новую запись на сервере!');
            });
    };
    $scope.update = function(item) {
        var editTodo = angular.copy(item);
        $http.patch(BASE_URL + 'todos/' + item.id + '.json', item)
            .success(function() {
                console.log(editTodo);
                for (var i = 0; i < $scope.todoArr.length; i++) {
                    if ($scope.todoArr[i].id == editTodo.id) {
                        $scope.todoArr.splice(i, 1, editTodo);
                        break;
                    }
                }
                console.log($scope.todoArr);
                $scope.showForm = false;
            })
            .error(function() {
                console.error('Обновление данных на сервере не удалось!');
            });
    };
    $scope.delete = function(item) {
        $http.delete(BASE_URL + 'todos/' + item.id + '.json')
            .success(function() {
                for (var i = 0; i < $scope.todoArr.length; i++) {
                    if ($scope.todoArr[i].id == item.id) {
                        $scope.todoArr.splice(i, 1);
                        break;
                    }
                }
            })
            .error(function() {
                console.error('Не удалось удалить элемент!');
            });
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
    };
    $scope.sortByName = function(reverse) {
        $scope.todoArr = $filter('orderBy')($scope.todoArr, 'name', reverse);
    };
    $scope.sortByDate = function(reverse) {
        $scope.todoArr = $filter('orderBy')($scope.todoArr, 'date', reverse);
    };

    $scope.fetchData();
}

module.exports = MainCtrl;
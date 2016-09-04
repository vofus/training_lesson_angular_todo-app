(function() {
    'use strict';

    DataFactory.$inject = ['$q', 'dataService', 'BASE_URL'];

    function DataFactory($q, dataService, BASE_URL) {
        var vm = this;
        vm.store = {};

        var factory = {
            getData: getData,
            postItem: postItem,
            deleteItem: deleteItem,
            patchItem: patchItem
        };

        return factory;

        function getData() {
            if (!!vm.store.data) {
                console.info('Data download from store');
                return $q.when(vm.store.data);
            }
            return dataService.processingData('GET', BASE_URL + '.json')
                .then(transformFetchedData)
                .catch(function(status) {
                    console.warn('Не удалось загрузить данные с сервера!', status);
                });

            function transformFetchedData(data) {
                console.info('Data download from server');

                var todos = data["todos"],
                    users = data["users"];

                vm.store.data = {};
                vm.store.data.todoArr = [];
                vm.store.data.users = [];
                // разбираем объект ответа на массивы
                for (var key in todos) {
                    todos[key].id = key;
                    todos[key].date = new Date(todos[key].year, todos[key].month, todos[key].day);
                    vm.store.data.todoArr.push(todos[key]);
                }
                for (var key in users) {
                    users[key].id = key;
                    vm.store.data.users.push(users[key]);
                }
                return vm.store.data;
            }
        }

        function postItem(item) {
            return dataService.processingData('POST', BASE_URL + 'todos.json', item)
                .then(transformData)
                .catch(function(status) {
                    console.warn('Не удалось загрузить данные с сервера!', status);
                });

            function transformData(response) {
                console.info('Data upload on server');
                console.log(response);
                for (var key in response) {
                    item.id = '';
                    item.id = response[key];
                    break;
                }
                vm.store.data.todoArr.push(item);

                return vm.store.data;
            }
        }

        function deleteItem(item) {
            return dataService.processingData('DELETE', BASE_URL + 'todos/' + item.id + '.json')
                .then(transformData)
                .catch(function(status) {
                    console.warn('Не удалось удалить элемент!', status);
                });

            function transformData() {
                for (var i = 0; i < vm.store.data.todoArr.length; i++) {
                    if (vm.store.data.todoArr[i].id === item.id) {
                        console.log('Remove item: ', item);
                        vm.store.data.todoArr.splice(i, 1);
                        break;
                    }
                }

                return vm.store.data;
            }
        }

        function patchItem(item) {
            var editTodo = angular.copy(item);
            return dataService.processingData('PATCH', BASE_URL + 'todos/' + item.id + '.json', item)
                .then(transformData)
                .catch(function(status) {
                    console.warn('Обновление данных на сервере не удалось!', status);
                });

            function transformData() {
                console.info('Data update on server', item);
                for (var i = 0; i < vm.store.data.todoArr.length; i++) {
                    if (vm.store.data.todoArr[i].id === editTodo.id) {
                        vm.store.data.todoArr.splice(i, 1, editTodo);
                        break;
                    }
                }

                return vm.store.data;
            }
        }
    }

    module.exports = DataFactory;
})();
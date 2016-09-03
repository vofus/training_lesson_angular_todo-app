(function() {
    'use strict';

    MainCtrl.$inject = ['$filter', 'dataFactory'];

    function MainCtrl($filter, dataFactory) {
        var vm = this;

        vm.todoArr = [];
        vm.filteredTodos = [];
        vm.users = [];
        vm.currentItem = {};
        vm.showForm = false;
        vm.showAddForm = false;
        vm.confirmTrigger = false;
        vm.statesOfProgress = {
            'in_progress': 'В процессе',
            'partial': 'Частично',
            'done': 'Выполнено'
        };

        vm.editOrCreate = editOrCreate;
        vm.showConfirm = showConfirm;
        vm.remove = remove;
        vm.saveEdit = saveEdit;
        vm.cancelEdit = cancelEdit;
        vm.sortByName = sortByName;
        vm.sortByDate = sortByDate;
        vm.stateFilter = stateFilter;

        activate();

        function activate() {
            return fetchData();
        }

        function fetchData() {
            dataFactory.getData()
                .then(completeFetchingData);

            function completeFetchingData(data) {
                vm.todoArr = data.todoArr;
                vm.users = data.users;
                vm.filteredTodos = angular.copy(vm.todoArr);
            }
        }

        function remove(item) {
            dataFactory.deleteItem(item)
                .then(completeDelete);

            function completeDelete(data) {
                vm.filteredTodos = angular.copy(vm.todoArr);
                vm.confirmTrigger = false;
            }
        }

        function editOrCreate(item) {
            vm.currentItem = item ? angular.copy(item) : {};
            vm.showForm = true;
        }

        function create(item) {
            dataFactory.postItem(item)
                .then(completePosting);

            function completePosting(data) {
                scope.filteredTodos = angular.copy(scope.todoArr);
            }
        }

        function update(item) {
            dataFactory.patchItem(item)
                .then(completePatching);

            function completePatching(data) {
                vm.filteredTodos = angular.copy(vm.todoArr);
                vm.showForm = false;
            }
        }

        function showConfirm(item) {
            vm.currentItem = angular.copy(item);
            vm.confirmTrigger = true;
        }

        function saveEdit(item) {
            item.year = item.date.getFullYear();
            item.month = item.date.getMonth();
            item.day = item.date.getDate();
            item.strDate = $filter('date')(item.date, 'dd.MM.yyyy');

            if (angular.isDefined(item.id)) {
                vm.update(item);
            } else {
                item.done = false;
                vm.create(item);
            }
            vm.showForm = false;
        }

        function cancelEdit() {
            vm.currentItem = {};
            vm.showForm = false;
            vm.confirmTrigger = false;
        }

        function sortByName(revers) {
            vm.filteredTodos = $filter('orderBy')(vm.todoArr, 'name', reverse);
        }

        function sortByDate(revers) {
            vm.filteredTodos = $filter('orderBy')(vm.todoArr, 'date', reverse);
        }

        function stateFilter(state) {
            vm.filteredTodos = $filter('filter')(vm.todoArr, {state: state});
        }
    }

    module.exports = MainCtrl;
})();
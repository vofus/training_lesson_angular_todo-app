function MainCtrl($scope, $filter, dataFactory) {

    $scope.todoArr = [];
    $scope.filteredTodos = [];
    $scope.users = [];
    $scope.currentItem = {};
    $scope.showForm = false;
    $scope.showAddForm = false;
    $scope.confirmTrigger = false;
    $scope.statesOfProgress = {
        'in_progress': 'В процессе',
        'partial': 'Частично',
        'done': 'Выполнено'
    };

    $scope.fetchData = function() {
        dataFactory.getData()
            .then(completeFetchingData);

        function completeFetchingData(data) {
            $scope.todoArr = data.todoArr;
            $scope.users = data.users;
            $scope.filteredTodos = angular.copy($scope.todoArr);
        }
    };
    $scope.editOrCreate = function(item) {
        $scope.currentItem = item ? angular.copy(item) : {};
        $scope.showForm = true;
    };
    $scope.create = function(item) {
        dataFactory.postItem(item)
            .then(completePosting);

        function completePosting(data) {
            $scope.filteredTodos = angular.copy($scope.todoArr);
        }
    };
    $scope.update = function(item) {
        dataFactory.patchItem(item)
            .then(completePatching);

        function completePatching(data) {
            $scope.filteredTodos = angular.copy($scope.todoArr);
            $scope.showForm = false;
        }
    };
    $scope.showConfirm = function(item) {
        $scope.currentItem = angular.copy(item);
        $scope.confirmTrigger = true;
    };
    $scope.delete = function(item) {
        dataFactory.deleteItem(item)
            .then(completeDelete);

        function completeDelete(data) {
            $scope.filteredTodos = angular.copy($scope.todoArr);
            $scope.confirmTrigger = false;
        }
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
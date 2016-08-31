function ShowMoreDir() {
    return {
        link: function(scope, element, attributes) {
            scope.amount = attributes['amount'];
            scope.currentPage = 1;
            scope.allPages = Math.ceil(scope.todoArr.length / scope.amount);
            console.log(scope.currentPage, scope.allPages);

            scope.$watch('todoArr', function(newVal, oldVal) {
                scope.filtredArr = newVal.slice(0, scope.amount * scope.currentPage);
                console.log(newVal, oldVal);
                console.log('filtredArr', scope.filtredArr);
            }, true);

            var btn = angular.element('<button>');
            btn.addClass('btn btn-default btn__show-more');
            btn.text('Показать еще...');
            element.parent().parent().append(btn);

            btn.on('click', function(event) {
                ++scope.currentPage;
                scope.filtredArr = scope.todoArr.slice(0, scope.amount * scope.currentPage);
                scope.$digest();
                console.log(scope.currentPage);
                // if (scope.currentPage > scope.allPages) {
                //     scope.currentPage = scope.allPages;
                // }
                // if (scope.currentPage <= scope.allPages) {
                //     scope.filtredArr = scope.todoArr.slice(0, scope.amount * scope.currentPage);
                //     scope.$digest();
                //     console.log(scope.currentPage);
                // }
            });
            // btn.attr('ng-click', 'showMore()');
            //
            // scope.showMore = function () {
            //
            //     scope.$apply(function(){
            //         ++scope.currentPage;
            //         scope.filtredArr = scope.todoArr.slice(0, scope.amount * scope.currentPage);
            //         console.log(scope.currentPage);
            //     });
            //
            // }
        },
        restrict: "A",
        replace: false,
        templateUrl: '../templates/table-row-template.html'
    }
}

module.exports = ShowMoreDir;
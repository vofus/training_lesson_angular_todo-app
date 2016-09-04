(function() {
    'use strict';

    function ShowMoreDir() {

        var directive = {
            link: linkFunc,
            restrict: "E",
            replace: true,
            scope: {
                filteredTodos: '=',
                trimmedArr: '='
            },
            templateUrl: '../templates/show-more.template.html'
        };

        return directive;

        function linkFunc(scope, element, attributes) {
            var btn = element;

            scope.amount = parseInt(attributes['amount'], 10);
            scope.currentPage = 1;

            btn.on('click', function() {
                scope.currentPage++;
                if (scope.currentPage <= scope.allPages) {
                    scope.trimmedArr = scope.filteredTodos.slice(0, scope.amount * scope.currentPage);
                    scope.currentPage === scope.allPages ? btn.addClass('hide') : btn.removeClass('hide');
                    scope.$apply();
                }
                return;
            });

            scope.$watch('filteredTodos', function(newVal, oldVal) {
                scope.allPages = Math.ceil(scope.filteredTodos.length / scope.amount);
                scope.trimmedArr = newVal.slice(0, scope.amount * scope.currentPage);
                scope.currentPage === scope.allPages ? btn.addClass('hide') : btn.removeClass('hide');
                console.log('filtred array: ', scope.filteredTodos);
                console.log('trimmed array: ', scope.trimmedArr);
            }, true);
        }
    }

    module.exports = ShowMoreDir;
})();
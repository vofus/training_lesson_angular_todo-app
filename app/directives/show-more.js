function ShowMoreDir() {
    return {
        link: function(scope, element, attributes) {
            scope.amount = attributes['amount'];
            scope.currentPage = 1;

            var tbody = document.getElementById('toDoList').getElementsByTagName('tbody')[0];

            var btn = angular.element('<button>');
            btn.addClass('btn btn-default btn__show-more');
            btn.text('Показать еще...');
            element.parent().parent().append(btn);

            btn.on('click', function(event) {
                ++scope.currentPage;
                if (scope.currentPage <= scope.allPages) {
                    scope.filtredArr = scope.filteredTodos.slice(0, scope.amount * scope.currentPage);
                    scope.currentPage === scope.allPages ? btn.addClass('hide') : btn.removeClass('hide');
                    scope.$digest();
                }
                return;
            });

            tbody.onclick = function(event) {
                var target = event.target,
                    notify = null;
                if (target.tagName == 'SPAN' && target.classList.contains('notify__close')) {
                    target.parentElement.classList.remove('notify__comment--show');
                    return false;
                }
                if (target.tagName == 'BUTTON' && target.classList.contains('notify__btn')) {
                    notify = target.parentElement.getElementsByClassName('notify__comment')[0];
                    notify.classList.add('notify__comment--show');
                    return false;
                }
                return;
            };

            scope.$watch('filteredTodos', function(newVal, oldVal) {
                scope.allPages = Math.ceil(scope.filteredTodos.length / scope.amount);
                scope.filtredArr = newVal.slice(0, scope.amount * scope.currentPage);
                scope.currentPage === scope.allPages ? btn.addClass('hide') : btn.removeClass('hide');
            }, true);
        },
        restrict: "A",
        replace: false,
        templateUrl: '../templates/table-row-template.html'
    }
}

module.exports = ShowMoreDir;
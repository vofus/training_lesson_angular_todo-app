(function() {
    'use strict';

    function TodoComment() {
        var directive = {
            link: lincFunc,
            restrict: 'E',
            replace: true,
            templateUrl: '../templates/todo-comment.template.html',
            scope: {
                item: '='
            }
        };

        return directive;

        function lincFunc(scope, elem, attrs) {

            var tbody = document.getElementById('toDoList').getElementsByTagName('tbody')[0];

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
        }
    }

    module.exports = TodoComment;
})();
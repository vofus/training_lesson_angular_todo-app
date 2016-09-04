(function() {
    'use strict';

    function ConfirmWindow() {
        var directive = {
            link: linkFunc,
            scope: {
                confirmTrigger: '=',
                cancelEdit: '&',
                remove: '&'
            },
            restrict: "E",
            replace: true,
            templateUrl: '../templates/confirm-window.template.html'
        };

        return directive;

        function linkFunc(scope, element) {
            var trigger;

            scope.$watch('confirmTrigger', function(newVal) {
                trigger = newVal;
                if (!trigger) {
                    element.addClass('hide');
                }
                if (!!trigger) {
                    element.removeClass('hide');
                }
            });
        }
    }

    module.exports = ConfirmWindow;
})();
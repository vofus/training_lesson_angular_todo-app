function ConfirmWindow() {
    return {
        link: function(scope, element, attributes) {
            var trigger;

            scope.$watch('confirmTrigger', function(newVal, oldVal) {
                trigger = newVal;
                console.log(trigger);
                if (!trigger) {
                    element.addClass('hide');
                }
                if (!!trigger) {
                    element.removeClass('hide');
                }
            });
        },
        restrict: "EA",
        replace: false,
        templateUrl: '../templates/confirm-window-template.html'
    }
}

module.exports = ConfirmWindow;
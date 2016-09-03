(function() {
    'use strict';

    DataService.$inject = ['$http'];

    function DataService($http) {
        var service =  {
            processingData: processingData
        };

        return service;

        function processingData(method, url, dataItem) {
            var config = {
                    method: method,
                    url: url,
                    data: dataItem
                };
            return $http(config)
                .then(procesingDataComplete)
                .catch(function(data, status) {
                    return status;
                });

            function procesingDataComplete(data) {
                return data.data;
            }
        }
    }

    module.exports = DataService;
})();
function DataFactory($http, $q) {
    return {
        processingData: function(method, url, dataItem) {
            var deferred = $q.defer(),
                config = {
                    method: method,
                    url: url,
                    data: dataItem
                };
            $http(config)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }
    }
}

module.exports = DataFactory;
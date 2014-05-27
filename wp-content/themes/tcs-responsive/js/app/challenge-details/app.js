var cdapp = angular.module('challengeDetails', ['restangular', 'ngCookies'])

.constant("API_URL", tcApiRUL)

.config(['$httpProvider', 'RestangularProvider', 'API_URL', function($httpProvider, RestangularProvider, API_URL) {
  /*
   * Enable CORS
   * http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api
   */
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // Base API url
  RestangularProvider.setBaseUrl(API_URL);

  //RestangularProvider.setDefaultHttpFields({'withCredentials': true});

  // Format restangular response

  // add a response intereceptor
  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    var extractedData;
    // .. to look for getList operations
    if (operation === "getList") {
      // .. and handle the data and meta data
      extractedData = data.data ? data.data : data;
      if (!(Object.prototype.toString.call(extractedData) === '[object Array]'))
        extractedData = [extractedData];
      extractedData.pagination = {
        total: data.total,
        pageIndex: data.pageIndex,
        pageSize: data.pageSize
      };
    } else {
      extractedData = data.data;
    }
    return extractedData;
  });
}]);



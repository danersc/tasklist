(function () {
  'use strict';

  angular
    .module('tasklist')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/dashboard/list");
      $urlRouterProvider.when("/", "/dashboard/list");
      
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/dashboard/list");
      
      $stateProvider
        .state('dashboard', {
            abstract: true,
            url: '/dashboard',
            templateUrl: 'views/dashboard.html'
        })
        .state('dashboard.list', {
            url: '/list',
            // loaded into ui-view of parent's template
            templateUrl: 'views/list.html',
            controller: 'TaskController'
        })

  }
})();
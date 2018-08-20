const myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController as hc'
    }).when('/forsale', {
        templateUrl: 'views/forsale.html',
        controller: 'SalesController as sc'
    }).when('/forrent', {
        templateUrl: 'views/forrent.html',
        controller: 'RentalController as rc'
    }).otherwise({
        templateUrl: 'views/404.html'
    });
});//end config

   

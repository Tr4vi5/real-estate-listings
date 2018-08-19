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
});

myApp.controller('HomeController', function ($http) {
    const vm = this;
    console.log('in Home controller');


})

myApp.controller('SalesController', function ($http) {
    const vm = this;
    console.log('in Sales controller');
    vm.allSales = [];


    vm.getSales = function () {
        $http({
            method: 'GET',
            url: '/listings/forsale/'
        }).then(function (response) {
            console.log('back from server with', response.data);
            vm.allSales = response.data;
        }).catch(function (error) {
            alert('Error')
            console.log('Error in GET', error);
        })
    }
    vm.getSales();
})

myApp.controller('RentalController', function ($http) {
    const vm = this;
    console.log('in Rental controller');
    vm.allRentals = [];

    vm.getRentals = function () {
        $http({
            method: 'GET',
            url: '/listings/forrent/'
        }).then(function (response) {
            console.log('back from server with', response.data);
            vm.allRentals = response.data;
        }).catch(function (error) {
            alert('Error')
            console.log('Error in GET', error);
        })
    }
    vm.getRentals();
})
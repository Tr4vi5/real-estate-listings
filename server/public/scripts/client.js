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

myApp.controller('HomeController', function ($http) {
    const vm = this;
    console.log('in Home controller');

    vm.addProperty = function(){
        let propertyToAdd = {
            cost: vm.cost,
            sqft: vm.sqft,
            type: vm.type,
            city: vm.city,
            image_path: vm.image_path
        }
        console.log(propertyToAdd);

        $http({
            method: 'POST',
            url: '/listings',
            data: propertyToAdd
        }).then({

        }).catch(function(error){
            alert('Sorry, can\'t add property');
            console.log('Error in addProperty POST', error);
        })
    }//end addProperty function
})//end HomeController

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
    }// end getSales function
    vm.getSales();

    vm.removeSale = function(id){
        console.log('in removeSale', id);
        $http({
            method: 'DELETE',
            url: '/listings/delete/' + id
        }).then(function (response) {
            vm.getSales();
        }).catch(function (error) {
            alert('Could not remove listing');
            console.log('Error in removeSale', error);
        })
    }//end removeSale function
})//end SalesController

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
    }// end getRentals function
    vm.getRentals();

    vm.removeRental = function (id) {
        console.log('in removeRental', id);
        $http({
            method: 'DELETE',
            url: '/listings/delete/' + id
        }).then(function(response){
            vm.getRentals();
        }).catch(function(error){
            alert('Could not remove listing');
            console.log('Error in removeRental', error);
        })
    }//end removeRental function
})//end RentalController
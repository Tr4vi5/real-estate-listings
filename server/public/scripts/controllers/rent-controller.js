myApp.controller('RentalController', function ($http) {
    const vm = this;
    console.log('in Rental controller');
    vm.allRentals = [];
    // vm.cheapestRental = {};
    // vm.showCheapest = false;

    vm.getRentals = function () {
        $http({
            method: 'GET',
            url: '/listings/forrent/'
        }).then(function (response) {
            console.log('back from server with', response.data);
            // vm.getCheapest();
            // vm.showCheapest = true;
            vm.allRentals = response.data;
        }).catch(function (error) {
            alert('Error')
            console.log('Error in GET', error);
        })
    }//end getRentals function
    vm.getRentals();

    vm.removeRental = function (id) {
        console.log('in removeRental', id);
        $http({
            method: 'DELETE',
            url: '/listings/delete/' + id
        }).then(function (response) {
            vm.getRentals();
        }).catch(function (error) {
            alert('Could not remove listing');
            console.log('Error in removeRental', error);
        })
    }//end removeRental function

    //  vm.getCheapest = function () {
    //     vm.cheapestRental = {};
    //     $http({
    //         method: 'GET',
    //         url: '/listings/cheaprental'
    //     }).then(function (response) {
    //         console.log(response.data);
    //         vm.cheapestRental = response.data;
    //         console.log(vm.cheapestRental);
    //     }).catch(function (error) {
    //         alert('Cannot get cheapest rental')
    //         console.log('Error in getCheapest', error);
    //     })
    // }//end getCheapest function

})//end RentalController
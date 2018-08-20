myApp.controller('HomeController', function ($http) {
    const vm = this;
    console.log('in Home controller');

    vm.addProperty = function () {
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
        }).then(function () {
            vm.cost = '';
            vm.sqft = '';
            vm.type = '';
            vm.city = '';
            vm.image_path = '';
        }).catch(function (error) {
            alert('Sorry, can\'t add property');
            console.log('Error in addProperty POST', error);
        })
    }//end addProperty function
})//end HomeController
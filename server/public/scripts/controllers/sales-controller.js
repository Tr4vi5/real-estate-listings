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

    vm.removeSale = function (id) {
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
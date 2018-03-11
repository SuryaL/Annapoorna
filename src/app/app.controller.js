// class syntax
class appCtrl {
    constructor($scope){
        'ngInject';
        $scope.name = 'I have a new name';
    }
}

// why?
// appCtrl.$inject = [ '$scope' ];

export default appCtrl;
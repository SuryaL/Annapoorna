class appCtrl {
    constructor($scope, Mymo){
        'ngInject';
        this.Mymo = Mymo;
        $scope.name = 'I have a new name';
    }

    $onInit(){
        this.Mymo.initLoader({parent:'.loading-spinner'});
    }
}

export default appCtrl;
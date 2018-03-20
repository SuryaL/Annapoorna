import angular from 'angular';
import MyToastrService from './myToastr.service';
import myToastrConfig from './myToastr.config';
import myToastrRun from './myToastr.run';
import 'angular-toastr';
import './myToastr.scss';

export default angular.module('myToastr', ['toastr'])
    .config(myToastrConfig)
    .run( myToastrRun)
    .service('MyToastr', MyToastrService)
	.name;

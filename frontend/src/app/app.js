import angular from 'angular';
import uirouter from 'angular-ui-router';
import inputPlaceholder from 'common/directives/inputPlaceholder';

// app //

import appConfig from './app.config';
import appRun from './app.run';
import mymo from 'common/services/mymo';

// common //
// import colpick from 'common/components/colpick/colpick';
import AuthService from 'common/services/auth';

// modules //
// import home from './home/home';
import main from './main/main';
import login from './login/login';


const app = angular.module('annapoorna', [uirouter, main,login, AuthService, inputPlaceholder,mymo])
app.config(appConfig)
app.run(appRun)

export default app.name;
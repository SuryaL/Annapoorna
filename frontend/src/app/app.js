import angular from 'angular';
import uirouter from 'angular-ui-router';


// app //

import appConfig from './app.config';
import appRun from './app.run';


// common //
// import colpick from 'common/components/colpick/colpick';


// modules //
import home from './home/home';
import main from './main/main';
import login from './login/login';


const app = angular.module('annapoorna', [uirouter, home, main,login])
app.config(appConfig)
app.run(appRun)

export default app.name;
import angular from 'angular';
import uirouter from 'angular-ui-router';

// app //
import controller from './app.controller';
import template from './app.html';
import appConfig from './app.config';
import appRun from './app.run';
import './app.scss';

// common //
// import colpick from 'common/components/colpick/colpick';


// modules //
import home from './home/home';
import main from './main/main';

const app = angular.module('annapoorna', [uirouter, home, main])
app.config(appConfig)
app.run(appConfig)

export default app.name;
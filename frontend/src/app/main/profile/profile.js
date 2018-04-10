import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileComponent from './profile.component';
import profilepic from 'common/components/profilepic/profilepic';
import user from 'common/services/user';

let profileModule = angular.module('profile', [
  uiRouter,
  profilepic,
  user
])
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
  .state ('app.main.profile', {
    url : 'profile',
    template : '<profile></profile>',
    authenticated: 'authenticated'
  });
})
.component('profile', profileComponent);

export default profileModule.name;

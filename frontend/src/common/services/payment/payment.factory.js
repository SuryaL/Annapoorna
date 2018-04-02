let VoteFactory = function($http, $httpParamSerializer) {
  'ngInject';

  const self = this;
  const API = ENV.API_URL;
  self.PATH = '/payment';

  self.getUserBalance = function(obj = {}) {
    return $http({
        method: 'GET',
        url: API + self.PATH+'/getUserBalance' + '?' + $httpParamSerializer(obj),
      })
      .then(resp => {
        return resp.data;
      })
  }

  self.getAllUsersBalances = function(obj = {}) {
    return $http({
        method: 'GET',
        url: API + self.PATH+'/getAllUsersBalances' + '?' + $httpParamSerializer(obj),
      })
      .then(resp => {
        return resp.data;
      })
  }

 self.addPayments = function(obj = {}) {
    return $http({
        method: 'POST',
        url: API + self.PATH+'/addPayments',
        data:obj
      })
      .then(resp => {
        return resp.data;
      })
  }

  // self.update = function(obj) {
  //   return $http({
  //       method: 'PUT',
  //       url: API + self.PATH,
  //       data: obj
  //     })
  //     .then((response) => {
  //       console.log("vote update resp:", response.data);
  //       return response.data;
  //     })
  // }

  // self.create = function(obj) {
  //   // console.log('received obj is :', obj);
  //   return $http({
  //       method: 'POST',
  //       url: API + self.PATH,
  //       data: obj
  //     })
  //     .then((response) => {
  //       console.log("Votes added:", response.data);
  //       return response.data;
  //     })
  // }

  // self.find = function(obj = {}) {
  //   return $http({
  //       method: 'GET',
  //       url: API + self.PATH + '?' + $httpParamSerializer(obj),
  //     })
  //     .then(resp => {
  //       return resp.data;

  //     })
  // }

  self.getMajority = function(obj = {}) {
    return $http({
        method: 'GET',
        url: API + self.PATH+'/getMajority' + '?' + $httpParamSerializer(obj),
      })
      .then(resp => {
        return resp.data;
      })
  }


  return self;
};

export default VoteFactory;
let VoteFactory = function($http, $httpParamSerializer) {
  'ngInject';

  const self = this;
  const API = ENV.API_URL;
  self.PATH = '/vote';

  self.update = function(obj) {
    return $http({
        method: 'PUT',
        url: API + self.PATH,
        data: obj
      })
      .then((response) => {
        console.log("vote update resp:", response.data);
        return response.data;
      })
      .catch((err) => {
        console.log("vote update err", err.data);
        return err.data;
      })
  }

  self.find = function() {
    return $http({
        method: 'GET',
        url: API + self.PATH
      })
      .then(resp => {
        return resp.data;

      })
      .catch(err => {
        console.log("vote find err:", err.data);
        return err.data;
      })
  }


  return self;
};

export default VoteFactory;
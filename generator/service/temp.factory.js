let <%= upCaseName %>Factory = function ($http,$httpParamSerializer) {
  'ngInject';

  var self = this;
  let API = ENV.API_URL;
  self.PATH = API+'/<%= name %>';

  self.create = function (data) {
    return $http.post(self.PATH, data);
  };

  self.find = function (query) {
    return $http.get(self.PATH, $httpParamSerializer(query));
  };

  self.findOne = function (id) {
    return $http.get(self.PATH + '/' + id);
  };

  self.update = function (id, data) {
    return $http.put(self.PATH + '/' + id, data);
  };

  self.destroy = function (id) {
    return $http.delete(self.PATH + '/' + id);
  };

  return self;
};

export default <%= upCaseName %>Factory;

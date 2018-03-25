let StatusFactory = function ($http,$httpParamSerializer) {
  'ngInject';

  var self = this;
  let API = ENV.API_URL;
  self.PATH = API+'/status';

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

  self.findActiveWeek = function () {
    return $http.get(self.PATH + '/' + 'getCurrentWeek')
    .then((res)=> res.data)
  };
  

  return self;
};

export default StatusFactory;

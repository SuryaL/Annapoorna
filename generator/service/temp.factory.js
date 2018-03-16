
let <%= upCaseName %>Factory = function (Storage, $http) {
  'ngInject';

  var self = this;
  self.PATH = '/v/1/<%= name %>';

  self.create = function (data) {
    return Storage.create (self.PATH, data);
  };

  self.find = function (query) {
    return Storage.query (self.PATH, query);
  };

  self.findOne = function (id) {
    return Storage.findOne(self.PATH, id);
  };

  self.update = function (id, data) {
    return Storage.update (self.PATH, id, data);
  };

  self.destroy = function (id) {
    return Storage.destroy (self.PATH, id);
  };

  return self;
};

export default <%= upCaseName %>Factory;

let MenuFactory = function($http, $state) {
    'ngInject';

    let self = this;
    let API = BASEURL.url;
    self.PATH = '/menu';

    self.update = function(obj) {
        return $http({
                method: 'PUT',
                url: API + self.PATH,
                data: obj
            })
            .then((response) => {
                console.log("menu update resp:", response.data);
                return response.data;
            })
            .catch((err) => {
                console.log("menu update err", err.data);
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
                console.log("menu find err:", err.data);
                return err.data;
            })
    }

    return self;
};

export default MenuFactory;

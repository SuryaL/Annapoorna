const UserFactory = function($http, $state) {
    'ngInject';

    const self = this;
    const API = ENV.API_URL;
    self.PATH = '/user';

    // self.update = function(obj) {
    //     return $http({
    //             method: 'PUT',
    //             url: API + self.PATH,
    //             data: obj
    //         })
    //         .then((response) => {
    //             console.log("menu update resp:", response.data);
    //             return response.data;
    //         })
    //         .catch((err) => {
    //             console.log("menu update err", err.data);
    //             return err.data;
    //         })
    // }

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

export default UserFactory;

const UserFactory = function($http, $state) {
    'ngInject';

    const self = this;
    const API = ENV.API_URL;
    self.PATH = '/user';
    self.profilepic_base = API + self.PATH + '/profilepic';

    self.create = function(obj) {
        return $http({
                method: 'POST',
                url: API + self.PATH,
                data: obj
            })
            .then(response => response.data)
    }

    self.emailUsers = function(data={}){
        return $http({
            method: 'POST',
            url: API + self.PATH + '/emailUsers',
            data
        })
        .then(response => response.data)
    }

    self.getprofileimageurl = function(id){
        return self.profilepic_base + '?id=' + id;
    }

    // self.update = function(obj) {
    //     return $http({
    //             method: 'PUT',
    //             url: API + self.PATH,
    //             data: obj
    //         })
    //         .then((response) => {
    //             console.log("user update resp:", response.data);
    //             return response.data;
    //         })
    //         .catch((err) => {
    //             console.log("user update err", err.data);
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
                console.log("user find err:", err.data);
                return err.data;
            })
    }

    return self;
};

export default UserFactory;

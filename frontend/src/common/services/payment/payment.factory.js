let VoteFactory = function($http, $q, $httpParamSerializer) {
    'ngInject';

    const self = this;
    const API = ENV.API_URL;
    self.PATH = '/payment';


    self.payment_user_type = (user_obj = {}) => {
        if(!user_obj) {
            return '';
        }
        return(user_obj.type || []).indexOf('user') != -1 ? 'user' : ((user_obj.type || []).indexOf('cook') != -1 ? 'cook' : '');
    }

    self.recalculatePaymentUser = (user) => {
        let user_type = self.payment_user_type(user);
        return $q((resolve, reject) => {
            if(user_type == 'user') {
                self.resetUserBalance().then(resolve).catch(reject);
            } else if(user_type == 'cook') {
                self.resetCookBalance().then(resolve).catch(reject);
            }else{
              resolve()
            }
        })

    }

    self.owes = () => {
        if(!self.userPayment || !self.userPayment.payments){
            return 0
        }
        
        return +self.userPayment.orders_bill - +self.userPayment.payments.total
    }

    self.resetCookBalance = () => {
        return self.getCookBalance().then(resp => {
            return self.userPayment = resp;
        })
    }

    self.resetUserBalance = () => {
        return self.getUserBalance().then(resp => {
            return self.userPayment = resp;
        })
    }

    self.getUserBalance = function(obj = {}) {
        return $http({
                method: 'GET',
                url: API + self.PATH + '/getUserBalance' + '?' + $httpParamSerializer(obj),
            })
            .then(resp => {
                return resp.data;
            })
    }
    self.getCookBalance = function(obj = {}) {
        return $http({
                method: 'GET',
                url: API + self.PATH + '/getCookBalance' + '?' + $httpParamSerializer(obj),
            })
            .then(resp => {
                return resp.data;
            })
    }

    self.getAllUsersBalances = function(obj = {}) {
        return $http({
                method: 'GET',
                url: API + self.PATH + '/getAllUsersBalances' + '?' + $httpParamSerializer(obj),
            })
            .then(resp => {
                return resp.data;
            })
    }

    // admin access multiple payments
    self.addPayments = function(obj = {}) {
        return $http({
                method: 'POST',
                url: API + self.PATH + '/addPayments',
                data: obj
            })
            .then(resp => {
                return resp.data;
            })
    }

    //for user access
    // send {pay_amount}
    self.addPaymentUser = function(obj = {}) {
        return $http({
                method: 'POST',
                url: API + self.PATH + '/addPaymentUser',
                data: obj
            })
            .then(resp => {
                return resp.data;
            })
    }

    // admin access
    // {status, week, user}
    self.updateUserPayment = function(obj = {}) {
        return $http({
                method: 'POST',
                url: API + self.PATH + '/updateUserPayment',
                data: obj
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
                url: API + self.PATH + '/getMajority' + '?' + $httpParamSerializer(obj),
            })
            .then(resp => {
                return resp.data;
            })
    }


    return self;
};

export default VoteFactory;
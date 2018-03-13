const cassandra = require('cassandra-driver');

module.exports = {
    port: 4001,
    cassandra: { 
        contactPoints: ['192.168.0.20'], // private ips
        keyspace: 'annapoorna',
        authProvider: new cassandra.auth.PlainTextAuthProvider('annapoorna', 'annapoorna!')
    },

    // List of user roles
    roles: [ 'user', 'cook', 'admin' ],

    TOKEN_SECRET: 'k?@Zr4=mpC^RMdLaU@sh68FdKMJ+wBTky+pQ*pxjpHjq#wz6YWc2U6eyNXEvmSNzbKGY98Wr8rn*XS-_8zSyNFkC?fu7eK8L5UtxjPgeR_#nR3Z%qM$%sKy3H-edpL+cSpD2aVZGyLrj^Yq4Ffe4QuLcbuSc8K=tXL7T%D+5%-6CwJ9Pm+QX2ygbk^=K5!YmUMyFhrta7qwHfa@L+2e98q7$yHu%rGfu5RaCAB$&NGZ5zD7sTkFH_-zbU_Xm=Dab',
    // OAuth 2.0
    FACEBOOK_CLIENT_ID: '1653283634989097',
    FACEBOOK_SECRET: 'b58070df68e4a33cba313c0431654fab', //
}
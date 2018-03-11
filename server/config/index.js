const cassandra = require('cassandra-driver');

module.exports = {
    port: 4001,
    cassandra: { 
        contactPoints: ['192.168.0.20'], // private ips
        keyspace: 'annapoorna',
        authProvider: new cassandra.auth.PlainTextAuthProvider('annapoorna', 'annapoorna!')
    },
}
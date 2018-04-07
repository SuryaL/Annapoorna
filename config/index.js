const cassandra = require('cassandra-driver');
const env = require('../env');

module.exports = {
    port: env.port,
    base_api_path: env.base_api_path,
    cassandra: {
        contactPoints: [env.cassandra_endpoint], // private ips //192.168.0.20
        keyspace: 'annapoorna',
        authProvider: new cassandra.auth.PlainTextAuthProvider('annapoorna', 'annapoorna!')
    },
    mail_enabled :env.mail.enabled,
    smtp: {
        pool: true,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: env.mail.user,
            pass: env.mail.password
        }
    },

    mailOptions: {
        from: 'Annapoorna App <donotereply@annapoorna.com>', // sender address
        replyTo: 'donotereply@annapoorna.com',
    },

    // List of user roles
    roles: ['user', 'cook', 'admin'],
   ...env.secret_configs
}
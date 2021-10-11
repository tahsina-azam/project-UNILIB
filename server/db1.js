const mysql = require('mysql8.0')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '678s543',
    database: 'unilib-reg-login'
})

module.exports = connection;
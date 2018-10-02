var mysql = require("mysql");
var config = require("./config.json");

var dbConnection = mysql.createPool(config);

module.exports = function () {
    return new Promise((resolve, reject) => {
        dbConnection.getConnection((error, connection) => {
            if (error) {
                return reject(error);
            }
            else {
                return resolve(connection);
            }
        });
    });
};
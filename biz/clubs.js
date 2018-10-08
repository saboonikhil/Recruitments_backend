var clubsDB = require('../db/clubs');

function getUpcoming(model) {
    return new Promise((resolve, reject) => {
        let date = new Date();
        
        date = formatDate(date);
        let date2 = new Date();
        date2.setDate(date2.getDate()+10);
        date2 = formatDate(date2);
        let z = [date,date2];
        let query = `select * from clubs where start_date > ? and end_date < ?;`;
        clubsDB.listings(model, query,z).then((data) => {
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        });
    });
}

function getAll(model) {
    return new Promise((resolve, reject) => {
        let query = "select * from clubs";
        let z = []
        clubsDB.listings(model, query,z).then((data) => {
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        });
    });
}

function getLive(model) {
    return new Promise((resolve, reject) => {
        let date = new Date();
        date = formatDate(date);
        let query = "select * from clubs where start_date < ? and end_date > ?;"
        let z = [date,date]
        clubsDB.listings(model, query,z).then((data) => {
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        });
    });
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = {
    getUpcoming,
    getAll,
    getLive
};
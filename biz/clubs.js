var clubsDB = require('../db/clubs');

function getUpcoming(model) {
    return new Promise((resolve, reject) => {
        let date = new Date();
        date.setDate(date.getDate(), 1);
        let date2 = date.setDate(date.getDate(), 10);
        
        let query = `select * from clubs where start_date between ${date} and ${date2};`;
        clubsDB.listings(model, query).then((data) => {
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        });
    });
}

function getAll(model) {
    return new Promise((resolve, reject) => {
        let query = "select * from clubs";
        clubsDB.listings(model, query).then((data) => {
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        });
    });
}

function getLive(model) {
    return new Promise((resolve, reject) => {
        let date = new Date();
        let query = `select * from clubs where start_date > ${date} && end_date < ${date}`;
        clubs.listings(model, query).then((data) => {
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        });
    });
}

function getClubID() {
    
}

module.exports = {
    getUpcoming,
    getAll,
    getLive
};
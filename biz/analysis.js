var analysis = require('../db/analysis');

function getSubmissions(model) {
    return new Promise((resolve,reject) => {
        analysis.getSub(model).then((data) => {
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        });
    });
}

function getClubSubmissions(model) {
    return new Promise((resolve,reject) => {
        analysis.clubsumbission(model).then((data) => {
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        });
    });
}

module.exports = {
    getSubmissions,
    getClubSubmissions
};
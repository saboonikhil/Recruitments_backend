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

function getDistinctClubs(model) {
    return new Promise((resolve,reject) => {
        analysis.getClubs(model).then((data) => {
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        })
    })
}

function getOverview(model) {
    return new Promise((resolve,reject) => {
        analysis.overview(model).then((data) => {
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        })
    })
}

module.exports = {
    getSubmissions,
    getClubSubmissions,
    getDistinctClubs,
    getOverview
};
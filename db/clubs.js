var sqlconnection = require('./../sqlConnection');

function listings(model,query,z) {
    return new Promise((resolve, reject) => {
        sqlconnection().then((connection) => {
            model.connection = connection;
            let sqlquery = query;
            model.connection.query(sqlquery,z, (error, results) => {
                model.connection.release();
                if (error) {
                    return reject(error);
                }
                else {
                    if (results.length > 0) {
                        console.log(results);
                        let clubs = [];
                        for(var i=0;i<results.length;i++) {
                            clubs.push(results[i]);
                        }
                        return resolve({"success": true, "data" : clubs});
                    }
                    else {
                        return resolve({ "success": true, "message": "No club found" });
                    }
                }
            })
        }).catch((error) => {
            return reject(error);
        });
    });
}

function getClub(model) {
    return new Promise((resolve, reject) => {
        if(model.club_name) {
            sqlconnection().then((connection) => {
                model.connection = connection;
                let sqlquery = "select * from clubs where name = ?"
                model.connection.query(sqlquery,[model.club_name], (error, results) => {
                    model.connection.release();
                    if (error) {
                        return reject(error);
                    }
                    else {
                        if (results.length > 0) {
                            return resolve({"success": true, "data" : results[0]});
                        }
                        else {
                            return resolve({ "success": true, "message": "No club found" });
                        }
                    }
                });
            }).catch((error) => {
                return reject(error);
            });
        }
        else {
            return reject({"success": false, "message": "Invalid ID"});
        }
    });
}

module.exports = {
    listings,
    getClub
};
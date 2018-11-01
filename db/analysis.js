var sqlconnection = require('./../sqlConnection');

function getSub(model) {
    return new Promise((resolve, reject) => {
        sqlconnection().then((connection) => {
            model.connection = connection;
            var sqlquery = "";
            if(model.club == 0) {
                sqlquery = "select * from student_submission_map order by regno;";
            }
            else {
                sqlquery = "select * from student_submission_map where club_id = ? order by regno;";
            }
            
            model.connection.query(sqlquery, [model.club], (error, results) => {
                model.connection.release();
                if (error) {
                    return reject(error);
                }
                if (results.length > 0) {
                    return resolve({ "success": true, "data": results, "count": results.length });
                }
                else {
                    return resolve({ "success": true, "message": "No submissions found" });
                }
            });
        });
    });
}

function clubsumbission(model) {
    return new Promise((resolve, reject) => {
        if (model.club) {
            sqlconnection().then((connection) => {
                model.connection = connection;
                let sqlquery = "select * from student_submission_map where club_id = ? order by regno";
                model.connection.query(sqlquery, [model.club], (error, results) => {
                    model.connection.release();
                    if (error) {
                        return reject(error);
                    }
                    if (results.length > 0) {
                        return resolve({ "success": true, "data": results });
                    }
                    else {
                        return resolve({ "success": true, "message": "No submissions found" });
                    }
                });
            });
        }
        else {
            return resolve({ "success": false, "message": "Invalid submission. Missing registration number" });
        }
    });
}

function clubsumbission(model) {
    return new Promise((resolve, reject) => {
        sqlconnection().then((connection) => {
            model.connection = connection;
            let sqlquery = "select * from student_submission_map where club_id = ? order by regno";
            model.connection.query(sqlquery, [model.club], (error, results) => {
                model.connection.release();
                if (error) {
                    return reject(error);
                }
                if (results.length > 0) {
                    return resolve({ "success": true, "data": results });
                }
                else {
                    return resolve({ "success": true, "message": "No submissions found" });
                }
            });
        });
    });
}

function getClubs(model) {
    return new Promise((resolve, reject) => {
        sqlconnection().then((connection) => {
            model.connection = connection;
            let sqlquery = "select distinct ssm.club_id,c.name from student_submission_map as ssm inner join clubs as c on ssm.club_id = c.id";
            model.connection.query(sqlquery, [model.club], (error, results) => {
                model.connection.release();
                if (error) {
                    return reject(error);
                }
                if (results.length > 0) {

                    return resolve({ "success": true, "data": results });
                }
                else {
                    return resolve({ "success": true, "message": "No submissions found" });
                }
            });
        });
    });
}

function overview(model) {
    return new Promise((resolve, reject) => {
        sqlconnection().then((connection) => {
            model.connection = connection;
            let sqlquery = "select count (regno) from student_submission_map where club_id = ?";
            model.connection.query(sqlquery, [model.club], (error, results) => {
                model.connection.release();
                if (error) {
                    return reject(error);
                }
                if (results.length > 0) {
                    return resolve({ "success": true, "data": results[0] });
                }
                else {
                    return resolve({ "success": true, "message": "No submissions found" });
                }
            });
        });
    });
}

function domainoverview(model) {
    return new Promise((resolve, reject) => {
        sqlconnection().then((connection) => {
            model.connection = connection;
            let sqlquery = "select count (regno) from student_submission_map where domain = ? and scored >= 7 order by regno";
            model.connection.query(sqlquery, [model.domain], (error, results) => {
                model.connection.release();
                if (error) {
                    return reject(error);
                }
                if (results.length > 0) {
                    return resolve({ "success": true, "data": results[0] });
                }
                else {
                    return resolve({ "success": true, "message": "No submissions found" });
                }
            });
        });
    });
}

function getWeaknesses(model) {
    return new Promise((resolve, reject) => {
        sqlconnection().then((connection) => {
            model.connection = connection;
            let sqlquery = "select distinct weak from student_submission_map";
            model.connection.query(sqlquery, [model.club], (error, results) => {
                model.connection.release();
                if (error) {
                    return reject(error);
                }
                if (results.length > 0) {

                    return resolve({ "success": true, "data": results });
                }
                else {
                    return resolve({ "success": true, "message": "No submissions found" });
                }
            });
        });
    });
}

module.exports = {
    getSub,
    clubsumbission,
    getClubs,
    overview,
    domainoverview,
    getWeaknesses
};

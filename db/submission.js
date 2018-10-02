var sqlconnection = require('./../sqlConnection');

function sumbission(model) {
    return new Promise((resolve, reject) => {
        if(model.regno) {
            sqlconnection().then((connection) => {
                model.connection = connection;
                let sqlquery = "select * from student_submission_map where regno = ?";
                model.connection.query(sqlquery, [model.regno], (error, results) => {
                    model.connection.release();
                    if (error) {
                        return reject(error);
                    }
                    if (results.length > 0) {
                        return resolve({"success":true,"data": results});
                    }
                    else {
                        return resolve(false);
                    }
                });
            });
        }
        else {
            return resolve({"success" : false, "message" : "Invalid submission. Missing registration number"});
        }
    });
}

function getQuestions(model) {
    return new Promise((resolve,reject) => {
        if(model.club_id && model.domain) {
            sqlconnection().then((connection) => {
                model.connection = connection;
                let sqlquery = "select id,club_id,domain,question from club_question_map where club_id = ? and domain = ?";
                model.connection.query(sqlquery, [model.club_id,model.domain], (error, results) => {
                    model.connection.release();
                    if (error) {
                        return reject(error);
                    }
                    if (results.length > 0) {
                        return resolve({"success":true,"data": results});
                    }
                    else {
                        return resolve({"success":true,"message": "No questions found"});
                    }
                });
            });
        }
        else {
            return resolve({"success" : false, "message" : "Invalid submission. Missing registration number"});
        }
    });
}

function postAnswers(model) {
    return new Promise((resolve,reject) => {
        if(model.answers) {
            var marks = 0;
            sqlconnection().then((connection) => {
                model.connection = connection;
                let ques_id = [];
                for(item in model.answers) {
                    ques_id.append(item.id);
                }
                let sqlquery = "select * from club_question_map where id in (?)";
                model.connection.query(sqlquery, [ques_id], (error, results) => {
                    model.connection.release();
                    if (error) {
                        return reject(error);
                    }
                    if (results.length > 0) {
                        for(item in model.answers) {
                            for(ques in results) {
                                if(item.id == ques.id && item.marked_answer == ques.answer) {
                                    marks = marks + 1;
                                    break;
                                }
                            }
                        }
                        return resolve({"success":true, "data" : marks});
                    }
                    else {
                        return resolve({"success":true,"message": "No questions found"});
                    }
                });
            });
        }
    });
    
}

function getOptions(model) {
    return new Promise((resolve,reject) => {
        if(model.questionList) {
            sqlconnection().then((connection) => {
                model.connection = connection;
                let sqlquery = "select * from club_option_map where id in (?)";
                model.connection.query(sqlquery, [model.questionList], (error, results) => {
                    model.connection.release();
                    if (error) {
                        return reject(error);
                    }
                    if (results.length > 0) {
                        return resolve({"success":true,"data": results});
                    }
                    else {
                        return resolve({"success":true,"message": "No questions found"});
                    }
                });
            });
        }
        else {
            return resolve({"success" : false, "message" : "Invalid submission. Missing registration number"});
        }
    });
}

function postMarks(model) {
    return new Promise((resolve,reject) => {
        if(model.email && model.club_id && model.domain) {
            sqlconnection().then((connection) => {
                model.connection = connection;
                let sqlquery = "insert into club_option_map values(?,?,?,?);";
                model.connection.query(sqlquery, [model.email,model.club_id,model.domain,model.marks_secured], (error, results) => {
                    model.connection.release();
                    if (error) {
                        return reject(error);
                    }
                    else {
                        return resolve({"success":true,"marks": model.marks_secured});
                    }
                });
            });
        }
    });
}

module.exports = {
    sumbission,
    getQuestions,
    postAnswers,
    getOptions,
    postMarks
};
var sqlconnection = require('./../sqlConnection');

function sumbission(model) {
    return new Promise((resolve, reject) => {
        if(model.regno) {
            sqlconnection().then((connection) => {
                model.connection = connection;
                let sqlquery = "select * from student_submission_map where regno = ? order by club_id";
                model.connection.query(sqlquery, [model.regno], (error, results) => {
                    model.connection.release();
                    if (error) {
                        return reject(error);
                    }
                    if (results.length > 0) {
                        return resolve({"success":true,"data": results});
                    }
                    else {
                        return resolve({"success":true,"message": "No submissions found"});
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
            var weakness = "";
            sqlconnection().then((connection) => {
                model.connection = connection;
                var ques_id = [];
                for(item in model.answers) {
                    let x = model.answers[item];
                    ques_id.push(x["id"]);
                }
                let sqlquery = "select * from club_question_map where id in (?)";
                ques_id = ques_id.sort();
                model.connection.query(sqlquery, [ques_id], (error, results) => {
                    model.connection.release();
                    if (error) {
                        return reject(error);
                    }
                    marks = 0;
                    var flag = 0;
                    if (results.length > 0) {
                        for(item in model.answers) {
                            flag = 0;
                            for(ques in results) {
                                var x = model.answers[item];
                                var y = results[ques];
                                if(x.id == y.id && x.marked_answer == y.answer) {
                                    marks = marks + 1;
                                    flag = 1;
                                    break;
                                }
                                if(flag == 0) {
                                    weakness = y.type;
                                }
                            }
                        }
                        console.log(marks);
                        return resolve({"success":true, "data" : marks,"weak":weakness});
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
        if(model.email && model.id && model.domain) {
            sqlconnection().then((connection) => {
                model.connection = connection;
                let sqlquery = "insert into student_submission_map values(?,?,?,?,?);";
                model.connection.query(sqlquery, [model.email,model.id,model.domain,model.marks_secured,model.weak], (error, results) => {
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
        else {
            console.log("error");
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
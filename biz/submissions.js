var submissionGet = require('./../db/submission');
var clubsDB = require('./../db/clubs');

function getSubmissions(model) {
    return new Promise((resolve, reject) => {
        submissionGet.sumbission(model).then((data) => {
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        });
    });
}

function getQuestion(model) {
    return new Promise((resolve, reject) => {
        model["club_id"] = model.id;
        submissionGet.getQuestions(model).then((data) => {
            let questions = []
            let indices = []
            if (data.data) {
                for (var i = 0; i < data.data.length; i++) {
                    let index = Math.floor(Math.random() * data.data.length);
                    if (indices.indexOf(index + 1) == -1) {
                        indices[i] = index + 1;
                        questions[i] = data.data[index];
                    }
                    else {
                        i = i - 1;
                    }

                    if (questions.length == 10) {
                        break;
                    }
                }
                model["questionList"] = indices;
                submissionGet.getOptions(model).then((optionsData) => {
                    return resolve({ "success": true, "data": questions, "options": optionsData.data });
                }).catch((error) => {
                    return reject(error);
                });
            }
            else {
                return resolve({ "success": true, "message": "No questions found" });
            }
        });
    });
}

function postAnswers(model) {
    return new Promise((resolve, reject) => {
        submissionGet.postAnswers(model).then((data) => {
            console.log(data);
            if (data.data) {
                model["marks_secured"] = data.data;
                submissionGet.postMarks(model).then((postedData) => {
                    return resolve(postedData);
                }).catch((error) => {
                    return reject(error);
                });
            }
        }).catch((error) => {
            return reject(error);
        });
    });
}

module.exports = {
    getSubmissions,
    getQuestion,
    postAnswers
};
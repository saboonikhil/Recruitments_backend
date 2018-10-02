var add = require('./../db/student');
var mail = require('./mailer');

function addStudent(model) {
    return new Promise((resolve,reject) => {
        add.findUser(model).then((isPresent) => {
            add.createRecord(model,isPresent).then((data) => {
                if(data["success"]) {
                    mail.sendOTP(data["otp"],model.recipient).then((data) => {
                        return resolve({"success" : true});
                    }).catch((error) => {
                        return reject(error);
                    })
                }
            }).catch((error) => {
                return reject(error);
            });
        }).catch((error) =>{
            return reject(error);
        });
    });
}

function verifyStudent(model) {
    return new Promise((resolve,reject) => {
        add.verify(model).then((data) => {
            if(data["success"]) {
                return resolve({"success":true});
            }
            else {
                return resolve(data);
            }
        }).catch((error) => {
            return reject(error);
        });
    })
}

module.exports = {
    addStudent,
    verifyStudent
}
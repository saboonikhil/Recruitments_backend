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
    });
}

function bulkInsert(model) {
    var x = 0;
    return new Promise((resolve,reject) => {
        for(var i=1;i<=15000;i++) {
            var domain = ["@gmail.com","@icloud.com","@yahoo.com","@hotmail.com","@me.com","@go.com"] 
            model["recipient"] = generatemail+domain[Int(Math.random()*6)]
            add.createRecord(model,false).then((data) => {
                console.log(data);
            }).catch((error) => {
                x = 1;
                console.log(error);
            });
            if(x == 1) {
                break;
            }
        }
        if(x == 1) {
            return reject(error);
        }
        else {
            return resolve({"success": true});
        }
    });
}

function generatemail() {
    const length = 13;
    const ts = Math.round((new Date()).getTime() / 1000);

    let code = ts.toString(16).substring(0, 8);
    if (length <= code.length) {
        return code.substring(code.length - length);
    }

    const extraLength = length - code.length;

    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < extraLength; i++)
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    return code;
}

module.exports = {
    addStudent,
    verifyStudent
}
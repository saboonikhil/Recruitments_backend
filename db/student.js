var sqlconnection = require('./../sqlConnection');

function createRecord(model,presence) {
    return new Promise((resolve,reject) => {
        var otp = generateOTP();
        var id = createID();
        if(model.recipient) {
            sqlconnection().then((connection) => {
                model.connection = connection;
                let sqlquery = "";
                var z = []
                if(presence) {
                    sqlquery = "update student set otp = ? where email = ?;"
                    z = [otp,model.recipient]
                }
                else {
                    sqlquery = `INSERT INTO student (id,email,otp) VALUES (?,?,?);`
                    z = [id,model.recipient,otp]
                }
                model.connection.query(sqlquery,z,(error) => {
                    model.connection.release();
                    if(error) {
                        return reject(error);
                    }
                    else {
                        return resolve({
                            "success":true,
                            "otp":otp
                        });
                    }
                });
            }).catch((error) => {
                console.log(error);
                return reject(error);
            })
        }
        else {
            return reject("One of the fields is missing");
        }
        
    })
}

function verify(model) {
    return new Promise((resolve,reject) => {
        if(model.recipient && model.otp) {
            sqlconnection().then((connection) => {
                model.connection = connection;
                let sqlquery = "select * from student where email = ?";
                model.connection.query(sqlquery,[model.recipient],(error,results) => {
                    model.connection.release();
                    if(error) {
                        return reject(error);
                    }
                    else {
                        if(results.length > 0) {
                            if(model.otp == results[0].otp) {
                                return resolve({"success":true});
                            }
                            else {
                                return resolve({"success":false, "message": "Incorrect OTP"});
                            }
                        }
                        else {
                            return resolve({"success":false, "message": "No user found"});
                        }
                    }
                })
            }).catch((error) => {
                return reject(error);
            })
        }
        else {
            return reject("One of the fields is missing")
        }
    })
}

function findUser(model) {
    return new Promise((resolve,reject) => {
        if(model.recipient) {
            sqlconnection().then((connection) => {
                model.connection = connection;
                let sqlquery = "select * from student where email = ?";
                model.connection.query(sqlquery,[model.recipient],(error,results) => {
                    model.connection.release();
                    if(error) {
                        return reject(error);
                    }
                    if(results.length > 0) {
                        return resolve(true);
                    }
                    else {
                        return resolve(false);
                    }
                });
            });
        }
    });
}

function generateOTP() {
    let otp = Math.random();
    otp = Number(Math.floor(otp*1000000));
    return otp;
}

function createID() {
    let length = 9;
    let ts = String((new Date()).getTime()).substring(8,13);

    let code = ts;
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
    createRecord,
    verify,
    findUser
}
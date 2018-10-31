var express = require('express');
var router = express.Router();
var studentBIZ = require('../biz/student');

router.post('/student',(req,res) => {
    let body = req.body;
    studentBIZ.addStudent(body).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send({"success" : false, "message": error});
        console.log(error);
    });
});

router.post('/verifyStudent',(req,res) => {
    let body = req.body;
    studentBIZ.verifyStudent(body).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send({"success": false, "message" : error})
    });
});

router.post('/insert',(req,res) => {
    let body = req.body;
    studentBIZ.bulkInsert(body).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send({"success": false, "message" : error});
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var submissionsBIZ = require('../biz/submissions');

router.post('/getSubmission',(req,res) => {
    let body = req.body;
    submissionsBIZ.getSubmissions(body).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send({"success": false, "message" : error})
    });
});

router.post('/getQues',(req,res) => {
    let body = req.body;
    submissionsBIZ.getQuestion(body).then((data) => {
        console.log(data);
        res.send(data);
    }).catch((error) => {
        res.send({"success": false, "message" : error})
    });
});

router.post('/postAnswers',(req,res) => {
    let body = req.body;
    console.log(body);
    submissionsBIZ.postAnswers(body).then((data) => {
        res.send(data);
    }).catch((error) => {
        return reject(error);
    });
});

module.exports = router;
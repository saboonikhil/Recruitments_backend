var express = require('express');
var router = express.Router();
var clubsBIZ = require('../biz/clubs');

router.get('/upcoming',(req,res) => {
    let body = req.body;
    clubsBIZ.getUpcoming(body).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send({"success" : false, "message": error});
        console.log(error);
    });
});

router.get('/live',(req,res) => {
    let body = req.body;
    console.log(body);
    clubsBIZ.getLive(body).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send({"success": false, "message" : error})
    });
});

router.get('/list',(req,res) => {
    let body = req.body;
    console.log(body);
    clubsBIZ.getAll(body).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send({"success": false, "message" : error})
    });
});

module.exports = router;
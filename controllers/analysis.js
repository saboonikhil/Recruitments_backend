var express = require('express');
var router = express.Router();
var analysisBIZ = require('../biz/analysis');
var clubsBIZ = require('../biz/clubs');

router.get('/clubs',(req,res) => {
    let model = req.body;
    clubsBIZ.getAll(model).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send({"success": false, "message" : error});
    });
});

router.post('/submissions',(req,res) => {
    let body = req.body;
    analysisBIZ.getSubmissions(body).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send({"success": false, "message" : error});
    });
});

router.get('/distinct',(req,res) => {
    let model = req.body;
    analysisBIZ.getDistinctClubs(model).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send({"success": false, "message" : error});
    });
});

router.post('/submissionoverview',(req,res) => {
    let model = req.body;
    analysisBIZ.getOverview(model).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send({"success": false, "message" : error});
    });
});

router.post('/domainoverview',(req,res) => {
    let model = req.body;
    analysisBIZ.domainView(model).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send({"success": false, "message" : error});
    });
});

module.exports = router;
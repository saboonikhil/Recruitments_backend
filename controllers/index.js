var express = require('express');
var router = express.Router();

router.use('/login',require('./login'));
router.use('/clubs',require('./clubs'));
router.use('/submissions',require('./submissions'));
router.use('/analysis',require('./analysis'));

module.exports = router;
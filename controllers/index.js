var express = require('express');
var router = express.Router();

router.use('/login',require('./login'));
router.use('/clubs',require('./clubs'));
router.use('/submissions',require('./submissions'));

module.exports = router;
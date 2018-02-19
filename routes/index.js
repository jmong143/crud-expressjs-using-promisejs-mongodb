var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ajax1', function(req, res, next) {
  res.render('ajax1', { title: 'AJAX1' });
});

module.exports = router;

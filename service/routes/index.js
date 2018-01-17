var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../views/index',{title:666})
});
router.get('/ddd', function(req, res, next) {
  res.json({'name':666});
});
module.exports = router;

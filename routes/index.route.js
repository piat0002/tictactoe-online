var express = require('express');
var router = express.Router();

router.get('/', (request, response) => {
  response.render('index', { title: 'Express' });
});

module.exports = router;

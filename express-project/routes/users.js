var express = require('express');
const {validateUser} = require("../middlewares/validators/userValidators");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/' , validateUser  , async (req, res, next)=>{

})

module.exports = router;

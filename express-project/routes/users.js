var express = require('express');
const {validateUser} = require("../middlewares/validators/userValidators");
const User = require("../models/User");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/'  ,validateUser , async (req, res, next)=>{
    const body = req.body
    try {
    await  User.create(req.body)
    }catch (e){
      res.status(402).json({error: e});
    }
})

router.get('/' , validateUser  , async (req, res, next)=>{
return {
  message : 'respond with a resource'
}
})
module.exports = router;

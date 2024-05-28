var express = require('express');
const { validateUserCreation , validateLogin} = require("../middlewares/validators/userValidators");
const User = require("../models/User");
const {addUser, loginUser, getUserByType , getUserById , getUserByNumber , getUserByEmail , getAllUser , getAdminAllUser , deleteUserById} = require("../controllers/userController");
const {verifyToken , verifyAdmin} = require("../middlewares/auth");
const router = express.Router();



router
  .post('/' , validateUserCreation, addUser)
  .post('/login' , validateLogin , loginUser)
  .get('/filterby/:type/:value', verifyToken, getUserByType)
  .get('/filterby/:id' , verifyToken, getUserById )
  .get('/filterby/:phone' , verifyToken, getUserByNumber )
  .get('/filterby/:email' , verifyToken, getUserByEmail )
  .get("/getall" , verifyToken, getAllUser)
  .get("/getallAdminUsers" , verifyAdmin, getAdminAllUser)
  .delete("/:id" , verifyToken, deleteUserById)



module.exports = router;

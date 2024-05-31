var express = require('express');
const {validateUserCreation, validateLogin} = require("../middlewares/validators/userValidators");
const {
  addUser,
  loginUser,
  getUserByType
  ,
  getUserById,
  updateUser,
  getUserByNumber,
  deleteAllUsers,
  getUserByEmail,
  getUserByTypeForSimpleUser,
  getAllUser,
  getAdminAllUser,
  deleteUserById,
  activate_user
} = require("../controllers/userController");
const {verifyToken, verifyAdmin} = require("../middlewares/auth");
const router = express.Router();


router
  .post('/', validateUserCreation, addUser)
  .post('/login', validateLogin, loginUser)
  .post('/activate_account/:token', activate_user)
  .get('/admin/filterby', verifyAdmin, getUserByType)
  .get('/defaultUser/filterby', verifyToken, getUserByTypeForSimpleUser)
  .get('/byId/:id', verifyToken, getUserById)
  .get('/byPhone/:phone', verifyToken, getUserByNumber)
  .get('/ByEmail/:email', verifyToken, getUserByEmail)
  .get("/getall", verifyToken, getAllUser)
  .get("/getallAdminUsers", verifyAdmin, getAdminAllUser)
  .put('/updateById/:id', verifyToken, updateUser)
  .delete("/delete/:id", verifyToken, deleteUserById)
  .delete('/deleteall', verifyAdmin, deleteAllUsers);


module.exports = router;

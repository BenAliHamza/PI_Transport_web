const User = require("../models/User") ;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendActivationEmail, sendResetEmail}  = require('../shared/services/transporter')
require('dotenv').config()

function isConnectedOrAdmin(req, userId) {
  return req.user.role === 'ADMIN' || req.user._id.toString() === userId;
}
function isAdmin(user){
  return user.role === 'ADMIN';
}

 async function   addUser(req, res) {
   try {
     const {email, password} = req.body;
     if (email) {
       const user = await User.findOne({email: email});
       if (user) {
        return    res.status(301).json({
           message: "User email already exists",
         })
       } else {
         const {sex} = req.body.sex ;
         const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
         const image = req.file?.filename? req.file.filename:`${sex}.png`;
         const newUser = await User.create({...req.body, password: hashedPassword ,
          image : 'http://localhost:3000/uploads/' +image
         });
         const confirmation_link = await sendActivationEmail(newUser);
        return  res.status(200).json({
           confirmation_link : confirmation_link,
           message: "New user has been created !!!, an EMAIL has been sent for verification and validation of the account",
           user: newUser
         })
       }
     }
   } catch (e) {
     console.log(e);
    return  res.status(500).json({error: e.message});
   }
 }
 async  function activate_user(req, res) {
  const { token } = req.params;
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    // Find the user and update the status
    const user = await User.findByIdAndUpdate(
      userId,
      { status: 'APPROVED' },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Account successfully activated' , newUser: user });
  } catch (err) {
   return  res.status(400).json({ message: 'Invalid request  or expired token' });
  }
}
async function loginUser(req, res) {
     try {
       const {email, password} = req.body;
       if (!email || !password) {
         return res.status(400).json({message: 'Email and password are required'});
       }

       const user = await User.findOne({email: email});
       if (!user) {
         return res.status(404).json({message: 'User not found'});
       }
       if(user.status ==='PENDING'){
         return res.status(403).json({ message: 'User account is pending activation' });
       }
       if(user.status ==='BANNED'){
         return res.status(403).json({ message: 'User account is banned' });
       }
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
         return res.status(401).json({message:  'The password you entered is incorrect'});
       }
       const token = jwt.sign({id: user._id, role: user.role}, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_EXPIRATION});
       const expiresAt = jwt.decode(token).exp * 1000; // Convert to milliseconds
       return  res.status(200).json({
         message: 'Login successful',
         token: token,
         expiresIn: expiresAt
       });

     } catch (e) {
       console.error(e);
       return res.status(500).json({error: e.message});
     }

 }
 async function getUserByType(req, res) {
  try {
    const { type, value } = req.query;
    const isAdminConnected = isAdmin(req.user);
    if(!isAdminConnected) {
      return  res.status(401).json({message: 'You are not authorized to access this feature'});
    }
    if (!type || !value) {
      return res.status(400).json({ message: 'Type and value are required in request body' });
    }

    const aggregationPipeline = [
      { $match: { [type]: value } }
    ];

    const users = await User.aggregate(aggregationPipeline);

    if (!users || users.length === 0) {
      return res.status(404).json({ users: [] });
    }

    return res.status(200).json(users);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
async function getUserByTypeForSimpleUser(req, res) {
  try{
    const { type, value } = req.query;
    if (!type || !value) {
      return res.status(400).json({ message: 'Type and value are required in request body' });
    }
    if(isAdmin(!req.user)){
      if( type ==='role' && value ==="ADMIN"){
        return res.status(400).json({ message: 'You are not authorized to access this query (role : Admin)  as a  DEFAULT user' });
      }
      if( type ==='status' && value ==="PENDING"){
        return res.status(400).json({ message: 'You are not authorized to access this query (status : PENDING )  as a DEFAULT user' });
      }
    }

    const aggregationPipeline = [
      { $match: { [type]: value } } ,   { $match: { role: { $ne: "ADMIN" }, status: { $ne: "PENDING" } } }
    ];

    const users = await User.aggregate(aggregationPipeline);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'There is no user that satisfies the needed conditions', users : [] } );
    }

    return res.status(200).json(users);
  }catch(err){
    console.log(err)
    res.status(500).json({
      message : err.message
     })
  }
}
 async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json( user );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
async function getUserByEmail(req, res) {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email : email });
    if (!user) {
      return res.status(404).json({ message: `User with email ${email} is not found` });
    }
    res.status(200).json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
async function getUserByNumber(req, res) {
  try {
    const { phone } = req.params;
    const user = await User.findOne({phone : phone });
    if (!user) {
      return res.status(404).json({ message: `User with phone number ${phone} is not found` });
    }
    res.status(200).json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
async  function getAllUser(req ,res){
  try {
    const users = await User.find({ role: { $ne: 'ADMIN' } , status : { $ne : "PENDING"} });
    res.status(200).json({ users });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
async  function getAdminAllUser(req ,res){
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
async  function getInfoUser(req ,res ){
  try {
    user = req.user;
    delete user.password;
    res.status(200).json(user);
  }catch (e){
    console.log(e)
  }
}

async function deleteUserById(req, res){
  try {
    const userIdToDelete = req.params.id;

    // Check if the authenticated user is either the user to be deleted or an admin
    const state = isConnectedOrAdmin(req , userIdToDelete)

    if (!state) {
      return res.status(403).json({ message: 'Forbidden: You are not allowed to delete this user' });
    }
    const deletedUser = await User.findByIdAndDelete(userIdToDelete);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
async function deleteAllUsers(req, res) {
  try {
    // Delete all users
    await User.deleteMany({});

    // Respond with success message
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error', error: e.message });
  }
}
async function updateUser(req, res) {
  try{
    const {id} = req.params;
    const isAuthorized = isConnectedOrAdmin(req , id);
    if(!isAuthorized){
      return   res.status(403).json({ message: 'You are not allowed to update this user' });
    }
    const image = req.file?.filename;

    const updates  = image ?{...req.body , image :image} : req.body;
    if(updates.password){
      delete updates.password;
    }
    if(updates.email) {
      delete updates.email ;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found to be updated !!! ' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });

  }catch (e){
    res.status(500).json({
      error: 'Internal server error',
      message : e.message

    })
  }
}
async function changePassword(req , res ){
  try{
    const { password, newPassword ,id} = req.body;
    const userId = req.user._id; // Assuming the user ID is available in req.user
    if (!password || !newPassword || !id) {
      return res.status(400).json({ message: 'Old password / new password and user ID are required' });
    }
    const user = await User.findById(id);
    if (!user ) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Log the user ID and types for debugging
    if(user._id.toString() !== userId.toString()){
      return res.status(404).json({ message: 'You are not allowed to change password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'The old password is incorrect' });
    }
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(newPassword))){
      return res.status(403).json({ message: 'Password must match specifications !!!' });
    }
    user.password = await bcrypt.hash(newPassword, Number(process.env.SALT));
    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });
  }catch (e){
    res.status(500).json({ message: 'Server error', error: e });
  }
}
async function banFunction(req, res){
  try {
    const { id , type } = req.params;
    let user ;
    if( !id || !type){
      return res.status(403).json({ message: 'Missing informations needed ID and type' });
    }
    if( type === 'BAN' ){
     user =   await User.findByIdAndUpdate(id , {
        status : "BANNED"
      }, {new: true})
    }else {
     user =  await  User.findByIdAndUpdate(id , {
        status : "APPROVED"
      } , {new: true});
    }
    res.status(200).json({ message: `User ${user.status =="APPROVED"? "UNBANNED": "BANNED"} successfully` , user});

  }catch (e){
    res.status(500).json({ message: 'Server error', error: e });
  }
}
async function forgetPassword(req, res){
  try{
    const email = req.body.email ;
    if(!email) {
      return res.status(404).json({
        message : "User email is required !!! "
      })
    }
    const user = await User.findOne({email:email});
    if(!user){
      return res.status(404).json({
        message : "User email is incorrect !!! "
      })
    }
    const resetCode = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Call the function to send the reset email
   const resetlink =  await sendResetEmail(user, resetCode);

    res.status(200).json({
      message: "Reset email sent successfully." ,
      confirmationLink : resetCode
    });
  }catch(err){
    res.status(500).json({
      message : err.message
    })
  }
}
async function verifyResetCode(req, res) {
  try {
    const { newPassword } = req.body;
    const {token} = req.params ;
    if(!newPassword ){
      return res.status(403).json({
        message : "Password is required !!!"
      })
    }
    if( !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(newPassword))){
      return  res.status(403).json({
        messge : "Password must match specifications !!!"
      })
    }
    console.log(token)
    console.log(newPassword)
    // Verify the reset code using JWT
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Invalid reset code."
      });
    }

    // Hash the new password
    // Update the user's password
    user.password = await bcrypt.hash(newPassword, Number(process.env.SALT));
    await user.save();

    res.status(200).json({
      message: "Password reset successfully."
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

 module.exports = {forgetPassword ,getInfoUser , verifyResetCode , updateUser ,banFunction , changePassword , addUser, deleteAllUsers , getUserByTypeForSimpleUser , loginUser , getUserByType,activate_user  , getUserById , getUserByEmail , getUserByNumber , getAllUser , getAdminAllUser , deleteUserById}

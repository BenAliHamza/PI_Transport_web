const User = require("../models/userModel") ;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendActivationEmail }  = require('../shared/services/transporter')
require('dotenv').config()




 async function   addUser(req, res) {
   try {
     const {email, password} = req.body;
     if (email) {
       const user = await User.findOne({email: email});
       if (user) {
         res.status(301).json({
           message: "User email already exists",
         })
       } else {
         const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
         const newUser = await User.create({...req.body, password: hashedPassword});
         await sendActivationEmail(newUser);
         res.status(201).json({
           message: "New user has been created !!!",
           user: newUser
         })
       }
     }
   } catch (e) {
     console.log(e);
     res.status(500).json({error: e.message});
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
       // if(user.status ==='PENDING'){
       //   return res.status(403).json({ message: 'User account is pending activation' });
       // }
       // if(user.status ==='BANNED'){
       //   return res.status(403).json({ message: 'User account is banned' });
       // }
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
         return res.status(401).json({message:  'The password you entered is incorrect'});
       }
       const token = jwt.sign({id: user._id, role: user.role}, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_EXPIRATION});
       const expiresAt = jwt.decode(token).exp * 1000; // Convert to milliseconds
       res.status(200).json({
         message: 'Login successful',
         token: token,
         expiresIn: expiresAt
       });

     } catch (e) {
       console.error(e);
       res.status(500).json({error: e.message});
     }

 }
 async function getUserByType(req, res) {
  try {
    const { type, value } = req.params;

    if (!type || !value) {
      return res.status(400).json({ message: 'Type and value are required in request body' });
    }

    const aggregationPipeline = [
      { $match: { [type]: value } }
    ];

    const users = await User.aggregate(aggregationPipeline);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(users);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
 async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
async function getUserByEmail(req, res) {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
async function getUserByNumber(req, res) {
  try {
    const { phoneNumber } = req.params;
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
async  function getAllUser(req ,res){
  try {
    const users = await User.find({ role: { $ne: 'ADMIN' } });
    res.status(200).json({ users });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
async  function getAdminAllUser(req ,res){
  try {
    const users = await User.find({ role: 'ADMIN' });
    res.status(200).json({ users });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
async function deleteUserById(req, res){
  try {
    const userIdToDelete = req.params.id;

    // Check if the authenticated user is either the user to be deleted or an admin
    if (req.user.role !== 'ADMIN' && req.user._id.toString() !== userIdToDelete) {
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


 module.exports = { addUser, loginUser , getUserByType  , getUserById , getUserByEmail , getUserByNumber , getAllUser , getAdminAllUser , deleteUserById}

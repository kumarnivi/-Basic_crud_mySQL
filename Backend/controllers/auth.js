
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/authModel');



// Sigup
const signUpUser = async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    if (!isValidCompanyName(userName)) {
      return res.status(400).json({ message: 'Invalid user name' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({
      where: {
        email: email,
      }
    });

    if (user) {
      return res.status(200).json({ message: 'User Already exists', status: 200 });
    } else {
      const user = await User.create({
        email: email,
        password: hashedPassword,
        userName: userName
      });

      res.status(201).json({ message: 'Signed up successfully' });
    }
  } catch (error) {
    console.error({ error: 'Error registering user:', message: error.message });
    res.status(500).json({ message: 'Sign up error occurred' });
  }
};


// Login User
const loginUser = async (req, res) => {
  const secretKey =  "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.bQTnz6AuMJvmXXQsVPrxeQNvzDkimo7VNXxHeSBfClLufmCVZRUuyTwJF311JHuh"

  try {
    const { email, password } = req.body; 

    if (!email || !password) {
      return res.status(400).json({ message: 'User Email and Password are required', status: 400 });
    }
    
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: ["email", "password", "id", "userName"]
    });

    if (!user) {
      return res.status(404).json({ message: 'Authorization Failed', status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authorization Failed', status: 401 });
    }

    const token = jwt.sign({ user_email: email }, secretKey ,{ expiresIn: "3h" });
    res.cookie("tokenComp",token);
    return res.status(200).json({ message: "Success", token:token, status: 200, user: user });

  } catch (error) {
    console.error('Error while logging in:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}


// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'userName']
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error while fetching users:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}


// get single user

const getOneUser = async (req, res) => {
  try{
    const user = await User.findByPk(req.params.id,{
      attributes: ['id', 'email', 'userName']
    });

    return res.status(200).json(user);
  }catch(error){
    console.error('Error while logging in:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}


// delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found', status: 404 });
    }

    await user.destroy();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error while deleting user:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}


// edit by user
// const updateUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const userDataToUpdate  = req.body; // Assuming request body contains updated user data

//     const user = await User.findByPk(id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found', status: 404 });
//     }

//     await user.update(userDataToUpdate);

//     return res.status(200).json({ message: 'User updated successfully' });
//   } catch (error) {
//     console.error('Error while updating user:', error);
//     return res.status(500).json({ message: 'Internal Server Error', status: 500 });
//   }
// }


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, userName } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    user.email = email || user.email;
    user.userName = userName || user.userName;

    await user.save();

    return res.status(200).json({
      message: "User edited successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error editing user:", error);
    return res.status(500).json({ message: "User edit error occurred", status: 500 });
  }

};








// validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 6;
}

function isValidCompanyName(userName) {
  return userName.length > 3;
}

//   export

module.exports = {
    signUpUser,
    loginUser,
    getAllUsers ,
    getOneUser,
    deleteUser,
    updateUser,
    // changeUserPassword,
    // forgotPassword,
    // passwordReset
  }


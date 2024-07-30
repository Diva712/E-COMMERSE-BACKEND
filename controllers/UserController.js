const userModel = require('../models/UserModel')
const cloudinary = require('cloudinary');
const getDataUri = require('../utils/DataUri');

//register user
const registerController = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone, answer } = req.body;

    // Validation
    if (!name || !email || !password || !city || !address || !country || !phone || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already taken",
      });
    }

    // Check if file is provided
    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "Profile picture is required",
      });
    }

    // Upload profile picture to Cloudinary
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);

    // Create new user
    const user = new userModel({
      name,
      email,
      password,
      address,
      city,
      country,
      phone,
      answer,
      profilePic: {
        public_id: cdb.public_id,
        url: cdb.secure_url
      }
    });

    // Save user
    await user.save();

    res.status(201).send({
      success: true,
      message: "Registration Success, please login",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
}

//login user
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Add Email OR Password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    //user valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "USer Not Found",
      });
    }
    //check pass
    const isMatch = await user.comparePassword(password);
    //valdiation pass
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid credentials",
      });
    }
    //teken
    const token = user.generateToken();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error In Login Api",
      error,
    });
  }
}

//get profile
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User Prfolie Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In PRofile API",
      error,
    });
  }
};

//logout user
const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Logout SUccessfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In LOgout API",
      error,
    });
  }
}

//update user
const updateUserController = async (req, res) => {
  try {

    const user = await userModel.findById(req.user._id);
    const { name, email, address, city, country, phone } = req.body;
    // validation + Update
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Profile Updated",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update API",
      error,
    });
  }
}

//update password
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    //valdiation
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old or new password",
      });
    }
    // old pass check
    const isMatch = await user.comparePassword(oldPassword);
    //validaytion
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old Password",
      });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In LOgout API",
      error,
    });
  }
}

//update user Profile
const updateProfilePicture = async (req, res) => {
  try {

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "USer Not Found",
      });
    }

    const file = getDataUri(req.file);
    //delete previous image
    await cloudinary.v2.uploader.destroy(user.profilePic.public_id);

    const cdb = await cloudinary.v2.uploader.upload(file.content);

    user.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url
    }

    await user.save();


    res.status(200).send({
      success: true,
      messgae: "profile picture updated ",
      user,
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update User Profile API",
      error,
    });
  }
}

//forget password

const passwordReset = async (req, res) => {
  try {
    // user get email || newPassword || answer
    const { email, newPassword, answer } = req.body;
    // valdiation
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    // find user
    const user = await userModel.findOne({ email, answer });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "invalid user or answer",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Your Password Has Been Reset Please Login !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In password reset API",
      error,
    });
  }
}


//create a controller for admin get All User based on role
const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({ role: "user" });
    res.status(200).send({
      success: true,
      totalUsers: users.length,
      message: "All Users Fetched Successfully",
      users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get All Users API",
      error,
    });
  }
}


//delete user by admin
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Delete user profile picture from Cloudinary
    await cloudinary.v2.uploader.destroy(user.profilePic.public_id);

    // Delete user from the database
    await userModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete User API",
      error,
    });
  }
}



module.exports = {
  registerController, passwordReset, deleteUser,
  loginController, getUserProfile, logoutController, updateUserController,
  updatePasswordController, updateProfilePicture, getAllUser
};
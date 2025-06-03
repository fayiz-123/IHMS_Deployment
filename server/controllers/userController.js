const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifygmail = require("../utils/verifyGmail");
const generateOtp = require("../utils/generateOtp");
const passwordResetGmail = require("../utils/passwordResetGmail.");
const welcomeMail = require("../utils/welcomeGmail");

//signup
async function signup(req, res) {
  try {
    const { username, password, email, phone } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      if (!existingUser.isVerified) {
        return res.status(400).json({
          success: false,
          message: "Email already registered,Verify It",
          isVerified: false,
        });
      }
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = generateOtp();

      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        phone: phone,
        otp: otp,
        isVerified: false,
      });
      const savedUser = await newUser.save();
      const emailsent = await verifygmail(username, email, otp);
      if (!emailsent) {
        res.status(400).json({ success: false, message: "Failed to Sent OTP" });
      }
      res.status(201).json({
        success: true,
        message: "An OTP is sent to your Email",
        savedUser,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//otpVerification
async function otpVerification(req, res) {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: "invalid Otp or email" });
    }
    user.isVerified = true;
    user.otp = null;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Email Verified Successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//resendOtp
async function resendOtp(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const newOtp = generateOtp();
    if (!newOtp) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to generate new OTP" });
    }
    user.otp = newOtp;
    await user.save();
    const username = user.username;
    const sentMail = await verifygmail(username, email, newOtp);
    if (!sentMail) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to Sent  OTP mail" });
    }
    return res
      .status(200)
      .json({ success: true, message: "New OTP is sent to the email" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      return res
        .status(400)
        .json({ success: false, message: "email is invalid" });
    }
    const isValidPassword = await bcrypt.compare(password, existUser.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password is invalid" });
    }
    if (!existUser.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Verify the email First" });
    }
    const token = jwt.sign(
      {
        userID: existUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );

    existUser.lastLogin = new Date();
    await existUser.save();

    res
      .status(200)
      .json({ success: true, token, username: existUser.username });
    const username = existUser.username;
    if (existUser.isFirstLoggedIn === true) {
      await welcomeMail(email, username);
      existUser.isFirstLoggedIn = false;
      await existUser.save();
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//forgot-password

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const resetToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_PASSWORD_RESET_KEY,
      { expiresIn: "1h" }
    );

    const resetLink = `${process.env.RESET_LINK}/reset-password/${resetToken}`;
    const username = user.username;
    const sendResetMail = await passwordResetGmail(username, email, resetLink);
    if (!sendResetMail) {
      return res
        .status(400)
        .json({ success: false, message: "Email not sent,An error Occurred" });
    }

    return res.status(200).json({
      success: true,
      message: "Reset Link send Successfully",
      sendResetMail,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//reset-password

async function resetPassword(req, res) {
  try {
    const userId = req.userId;
    const { newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();
    return res
      .status(400)
      .json({ success: true, message: "Password updated Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//profile

async function profile(req, res) {
  try {
    const userId = req.user._id;
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(400).json({ success: false, message: "no user found" });
    }

    const primaryaddress = userProfile.addresses.find(
      (addr) => addr.primary === true
    );

    res.status(200).json({
      success: true,
      userProfile,
      username: userProfile.username,
      address: primaryaddress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//updateProfile

async function profileUpdate(req, res) {
  try {
    const { username, phone } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    if (username) user.username = username;
    if (phone) user.phone = phone;
    return res
      .status(200)
      .json({ success: true, message: "profile Updated Successfully", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//addNewAddress

async function addNewAddress(req, res) {
  try {
    const userId = req.user._id;
    const { addressLine, city, state, postalCode } = req.body;

    if (!addressLine || !city || !state || !postalCode) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found" });
    }

    if (user.addresses.length >= 3) {
      return res
        .status(400)
        .json({ success: false, message: "Only 3 Adddresses can create" });
    }

    user.addresses.forEach((addr) => (addr.primary = false));

    const newAddress = {
      addressLine: addressLine,
      city: city,
      state: state,
      postalCode: postalCode,
      primary: true,
    };

    user.addresses.push(newAddress);
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Address Added Successfully", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//DeleteAddress
async function deleteAddress(req, res) {
  try {
    const userId = req.user._id;
    const { addressId } = req.params;
    if (!addressId) {
      return res
        .status(400)
        .json({ success: false, message: "AddressId id Required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not Found" });
    }
    const addressExists = user.addresses.some(
      (addr) => addr._id.toString() === addressId
    );

    if (!addressExists) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found for this user" });
    }

    const isPrimary = user.addresses.find(
      (addr) => addr._id.toString() === addressId
    )?.primary;

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== addressId
    );

    if (isPrimary && user.addresses.length > 0) {
      user.addresses[user.addresses.length - 1].primary = true;
    }

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Deleted the address Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//PrimaryAddress
async function setPrimaryAddress(req, res) {
  try {
    const userId = req.user._id;
    const { addressId } = req.body;

    if (!addressId) {
      return res
        .status(400)
        .json({ success: false, message: "Address Id is required" });
    }
    const user = await User.findById(userId);

    let found = false;
    user.addresses.forEach((addr) => {
      if (addr._id.toString() === addressId) {
        addr.primary = true;
        found = true;
      } else {
        addr.primary = false;
      }
    });

    if (!found) {
      return res
        .status(400)
        .json({ success: false, message: "Address not Found" });
    }

    await user.save();

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  signup,
  otpVerification,
  forgotPassword,
  resetPassword,
  resendOtp,
  login,
  profile,
  profileUpdate,
  addNewAddress,
  deleteAddress,
  setPrimaryAddress,
};

const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const Service = require("../models/serviceModel");
const Contact = require("../models/contactModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const serviceConfirmationMail = require("../utils/serviceConfirmationMail");
require("dotenv").config();

//adminRegistration
async function adminRegistration(req, res) {
  try {
    const { name, email, password } = req.body;
    const findAdmin = await Admin.findOne({ email: email });
    if (findAdmin) {
      res
        .status(400)
        .json({ success: false, message: "This Email is registered Already" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const saveAdmin = await newAdmin.save();
      const token = jwt.sign(
        {
          adminId: saveAdmin._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // must be true in production
        sameSite: "None", // must be 'None' if frontend and backend are different domains
        path: "/",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      return res.status(200).json({
        success: true,
        message: "New Admin Registered SuccessFully",
        saveAdmin,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//adminLogin
async function adminLoggedIn(req, res) {
  try {
    const { email, password } = req.body;
    const checkAdmin = await Admin.findOne({ email: email });
    if (!checkAdmin) {
      return res
        .status(401)
        .json({ success: false, message: "Admin email is not Correct" });
    }
    const validAdminPassword = await bcrypt.compare(
      password,
      checkAdmin.password
    );
    if (!validAdminPassword) {
      res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });
    } else {
      const token = jwt.sign(
        {
          adminId: checkAdmin._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // must be true in production
        sameSite: "None", // must be 'None' if frontend and backend are different domains
        path: "/",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      res.status(200).json({
        success: true,
        message: "Admin LoggedIn Successfull",
        token: token,
        adminName: checkAdmin.name,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//getAdminProfile

async function getProfile(req, res) {
  try {
    const adminProfile = await Admin.findById(adminId).select("name email");
    if (!adminProfile) {
      return res
        .status(400)
        .json({ success: false, message: "Admin Not Found" });
    }
    return res.status(200).json({ success: true, adminProfile });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//AdminLogout

async function Logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    return res
      .status(200)
      .json({ success: true, error: false, message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//gettingUsers

async function getUsers(req, res) {
  try {
    const allUsers = await User.find();

    res.status(200).json({ success: true, message: "All Users Are", allUsers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//userBookedServices
async function UserServices(req, res) {
  try {
    const { userId } = req.params;

    const userServices = await Service.find({ userId });

    if (!userServices) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    return res.status(200).json({ success: true, userServices });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//bookedServices
async function bookedServices(req, res) {
  try {
    const allServices = await Service.find();
    res
      .status(200)
      .json({ success: true, message: "All BookedServices Are", allServices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//getContactMessages

async function contactMessages(req, res) {
  try {
    const contactMessages = await Contact.find().sort({ createdAt: -1 });
    if (!contactMessages) {
      return res
        .status(400)
        .json({ success: false, message: "No contactMessages Found" });
    }
    return res.status(200).json({
      success: true,
      message: "All Contact Messages",
      contactMessages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//updateStatus

async function UpdateServices(req, res) {
  try {
    const { serviceId } = req.params;
    const { status } = req.body;
    if (status === "booked") {
      return res
        .status(400)
        .json({ success: false, message: "Cannot set to Booked" });
    }
    const service = await Service.findByIdAndUpdate(
      serviceId,
      { status: status },
      { new: true }
    );
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    const {
      service: serviceName,
      email,
      name: username,
      _id: bookingId,
    } = service;
    const Dates = new Date();
    const formattedDate = Dates.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const bookingDate = formattedDate;
    ({ success: false, message: "Email not sent" });

    res.status(200).json({ success: true, service });
    const statusMail = await serviceConfirmationMail(
      email,
      serviceName,
      username,
      bookingId,
      bookingDate,
      status
    );
    if (!statusMail) {
      res.status(400).json;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  adminRegistration,
  adminLoggedIn,
  getProfile,
  Logout,
  getUsers,
  UserServices,
  bookedServices,
  contactMessages,
  UpdateServices,
};

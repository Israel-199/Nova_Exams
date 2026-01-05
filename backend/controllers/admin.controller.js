const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login Admin (sets cookie)
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

exports.getSession = (req, res) => { 
  const token = req.cookies.adminToken;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: { id: decoded.id, email: decoded.email, isAdmin: decoded.isAdmin, }, });
  } catch (err) {
    return res.json({ user: null });
  }
};

exports.logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("adminToken");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Logout failed" });
  }
};

// Get Admin Profile
exports.getProfile = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
    });
    res.json({
      success: true,
      data: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch profile",
        error: error.message,
      });
  }
};

// Update Admin Profile (name, email)
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedAdmin = await prisma.admin.update({
      where: { id: req.admin.id },
      data: { name, email },
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: updatedAdmin.id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update profile",
        error: error.message,
      });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
    });

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: { id: req.admin.id },
      data: { password: hashedPassword },
    });

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to change password",
        error: error.message,
      });
  }
};

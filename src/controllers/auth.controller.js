import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ROLES } from "../constants/roles.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || ROLES.VIEWER, // Default to viewer if not explicitly provided
  });

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/v1/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email. Select password explicitly because our model hides it by default.
  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
// @desc    Demo Login (Auto-create or login demo user)
// @route   POST /api/v1/auth/demo
// @access  Protected by API Key
export const demoLogin = asyncHandler(async (req, res) => {
  const email = process.env.DEMO_USER_EMAIL;
  const name = process.env.DEMO_USER_NAME;
  const password = process.env.DEMO_USER_PASSWORD;

  if (!email || !name || !password) {
    console.error("Demo login configuration error: missing environment variables", { email, name, password: !!password });
    res.status(500);
    throw new Error("Demo login is not configured on the server.");
  }

  let user = await User.findOne({ email });

  if (!user) {
    console.log(`Creating new demo user: ${email}`);
    try {
      user = await User.create({
        name,
        email,
        password,
        role: ROLES.OWNER,
      });
    } catch (createError) {
      console.error("Failed to create demo user:", createError.message);
      res.status(500);
      throw new Error("Failed to initialize demo account.");
    }
  }

  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

// @desc    Get current user profile
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

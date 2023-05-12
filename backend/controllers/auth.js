import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { logger } from "../config/logger.js";
/* REGISTER USER */
export const register = async (req, res) => {
  try {
    logger.info({
      message: "API request",
      method: req.method,
      path: req.path,
      query: req.query,
      body: req.body,
    });

    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      //viewedProfile: 1,
      //impression: 1
    });
    const savedUser = await newUser.save();
    logger.info(`User registered: ${email}`);

    res.status(201).json(savedUser);
  } catch (err) {
    logger.error(`User registration failed: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      logger.error("User login failed: User does not exist.");
      return res.status(400).json({ msg: "User does not exist. " });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.error(`User login failed: Invalid credentials for ${email}`);
      return res.status(400).json({ msg: "Invalid credentials. " });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    logger.info(`User logged in: ${email}`);
    res.status(200).json({ token, user });
  } catch (err) {
    logger.error(`User login failed: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

import dotenv from "dotenv";
dotenv.config();
import express from "express";

import UserController from "../controller/user.controller.js";
import authenticateUserMiddleware from "../middleware/authenticate.middleware.js";
import multer from "multer";
import path from "path";
import UserService from "../services/user.service.js";

const userRouter = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where the files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename
  },
});

const upload = multer({ storage: storage });

// Route to get registration form
userRouter
  .route("/getRegistrationForm")
  .post(UserController.getRegistrationForm);

// Route to register a user with file upload
userRouter.post("/register", upload.single("face"), async (req, res, next) => {
  console.log("File:", req.file);
  console.log("Body:", req.body);

  try {
    const { email, firstName, lastName, age, eventId } = req.body;
    if (!email || !firstName || !lastName || !age || !eventId) {
      return res
        .status(400)
        .json({ status: "error", message: "Please provide all the fields" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ status: "error", message: "No file uploaded" });
    }

    const facePath = "http://localhost:8000/" + req.file.filename;
    console.log(facePath);

    const result = await UserService.register(
      email,
      firstName,
      lastName,
      age,
      facePath,
      eventId
    );

    res.status(200).json({
      status: "success",
      message: "Registered successfully",
    });
  } catch (e) {
    next(e);
  }
});

// Other routes
userRouter.route("/signup").post(UserController.signup);
userRouter.route("/login").post(UserController.login);
userRouter.use(authenticateUserMiddleware);
userRouter.route("/getLoginDetail").post(UserController.getLoginDetail);
userRouter.route("/createEvent").post(UserController.createEvent);
userRouter.route("/createSubUser").post(UserController.createSubUser);
userRouter.route("/getRegistrations").post(UserController.getRegistrations);

export default userRouter;

import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  handleValidation,
  loginValidator,
  registerValidator,
} from "../middleware/validators.js";

const router = express.Router();

router.post("/register", registerValidator, handleValidation, register);
router.post("/login", loginValidator, handleValidation, login);
router.post("/logout", logout);

export default router;


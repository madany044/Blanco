import express from "express";
import {
  getMine,
  saveDraft,
  submit,
} from "../controllers/applicationController.js";
import { authenticate } from "../middleware/auth.js";
import { applicationValidator, handleValidation } from "../middleware/validators.js";

const router = express.Router();

router.post("/save-draft", authenticate, applicationValidator, handleValidation, saveDraft);
router.post("/submit", authenticate, applicationValidator, handleValidation, submit);
router.get("/me", authenticate, getMine);

export default router;


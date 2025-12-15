import express from "express";
import {
  listApplications,
  getApplicationById,
  updateStatus,
  updateNotes,
} from "../controllers/adminController.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/applications", authenticate, authorizeAdmin, listApplications);
router.get("/applications/:id", authenticate, authorizeAdmin, getApplicationById);
router.patch("/applications/:id/status", authenticate, authorizeAdmin, updateStatus);
router.patch("/applications/:id/notes", authenticate, authorizeAdmin, updateNotes);

export default router;

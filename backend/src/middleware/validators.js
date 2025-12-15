import { body, validationResult } from "express-validator";

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("VALIDATION ERRORS:", errors.array());
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }
  next();
};


export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password too short"),
  body("contactNumber")
    .isLength({ min: 7 })
    .withMessage("Contact number required"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const applicationValidator = [
  body("contactNumber").optional().isLength({ min: 7 }),
  body("teklaYears").optional().isInt({ min: 0 }),
  body("companiesWorked").optional().isInt({ min: 0 }),
  body("currentSalary").optional().isInt({ min: 0 }),
  body("expectedSalary").optional().isInt({ min: 0 }),
  body("lastIncrementDate").optional().isISO8601(),
];


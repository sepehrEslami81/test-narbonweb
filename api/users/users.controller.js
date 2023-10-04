const express = require("express");
const {
  create_new_user,
  login_user,
  check_otp_code,
} = require("./users.services");
const { body, query } = require("express-validator");
const { validateBody } = require("../../middlewares/validation");
const router = express.Router();

// add services
router.post(
  "/",
  body("user_name", "missing field").notEmpty(),
  body("phone_number", "missing field").notEmpty(),
  body("first_name", "missing field").notEmpty(),
  body("last_name", "missing field").notEmpty(),
  body("birth_year", "missing field").notEmpty(),

  validateBody,
  create_new_user
);

router.post(
  "/login",
  body("phone_number", "missing field").notEmpty(),
  validateBody,
  login_user
);

router.get(
  "/login",
  query("phone_number", "missing parameter").notEmpty(),
  query("otp_code", "missing parameter").notEmpty(),
  validateBody,
  check_otp_code
);

module.exports = router;

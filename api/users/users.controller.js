const express = require("express");
const { create_new_user } = require("./users.services");
const { body } = require("express-validator");
const { validateBody } = require("../../middlewares/validation");
const router = express.Router();

// add services
router.post(
  "/",
  body("user_name", "missing user_name field").notEmpty(),
  body("phone_number", "missing phone_number field").notEmpty(),
  body("first_name", "missing first_name field").notEmpty(),
  body("last_name", "missing last_name field").notEmpty(),
  body("birth_year", "missing birth_year field").notEmpty(),
//   body("phone_number", "invalid phone_number data").isMobilePhone([
//     "ir-IR",
//     "fa-IR",
//   ]),
  validateBody,
  create_new_user
);

module.exports = router;

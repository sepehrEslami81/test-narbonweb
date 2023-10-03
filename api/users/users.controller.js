const express = require("express");
const { create_new_user } = require("./users.services");
const router = express.Router();

// add services
router.post("/", create_new_user);

module.exports = router;

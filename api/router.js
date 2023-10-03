const express = require("express");
const router = express.Router();

const users_router = require("./users/users.controller");

// add routes
router.use("/users", users_router);

module.exports = router;

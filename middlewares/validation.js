const { validationResult } = require("express-validator");

module.exports.validateBody = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res
      .status(400)
      .json({ err: "body_validation_error", errors: validationErrors.array() });
    return;
  }

  next();
};

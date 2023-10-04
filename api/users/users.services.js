const { insert_new_user } = require("../../database/users");

module.exports.create_new_user = (req, res) => {
  req.body = {
    user_name: req.body.user_name, 
    phone_number: req.body.phone_number,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birth_year: req.body.birth_year,
  };

  insert_new_user(req.body)
    .then((r) => res.status(201).json(r))
    .catch((e) => res.status(400).json({ error: e }));
};

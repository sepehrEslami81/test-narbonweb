const mcache = require("memory-cache");
const { insert_new_user, get_user_by_phone } = require("../../database/users");

const create_random_number = (from, to) =>
  Math.floor(Math.random() * (to - from) + from);

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

module.exports.login_user = async (req, res) => {
  const { phone_number } = req.body;

  const user = await get_user_by_phone(phone_number);
  if (!user) {
    res.status(404).json({ error: "user not found." });
    return;
  }

  const expires_in = 60 * 2 * 1000; // 2 min converted in ms
  const code = create_random_number(1000, 9999);
  mcache.put(phone_number, code, expires_in);

  // send sms in background

  res.json({ message: "sms sent", code_showed_just_for_test: code });
};

module.exports.check_otp_code = (req, res) => {
  const { phone_number, otp_code } = req.query;

  const cache_data = mcache.get(phone_number);
  if (cache_data == otp_code)
    res.json({
      message: "login successfuly",
      token: "<jwt token>",
    });
  else res.status(401).json({ error: "unauthorized user" });
};

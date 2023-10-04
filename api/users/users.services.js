const mcache = require("memory-cache");
const {
  insert_new_user,
  get_user_by_phone,
  get_user_by_id,
  get_users,
} = require("../../database/users");
const { send_otp_sms } = require("../../lib/sms");

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

  let user;
  try {
    user = await get_user_by_phone(phone_number);
  } catch (error) {
    res.status(500).json(error);
    return;
  }
  if (!user) {
    res.status(404).json({ error: "user not found." });
    return;
  }

  const expires_in = 60 * 2 * 1000; // 2 min converted in ms
  const code = create_random_number(1000, 9999);
  mcache.put(phone_number, code, expires_in);

  await send_otp_sms(phone_number, code);

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

module.exports.get_user_by_id = (req, res) => {
  const { id } = req.params;

  get_user_by_id(id)
    .then((r) => {
      if (r) res.json(r);
      else res.status(404).json({ error: "user not found." });
    })
    .catch((e) => res.status(500).json({ error: e }));
};

module.exports.get_all_user = (req, res) => {
  get_users()
    .then((r) => res.json(r))
    .catch((e) => res.status(500).json({ error: e }));
};

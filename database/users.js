const { users } = require("../models");

module.exports.insert_new_user = async (data) => {
  return await users.create(data);
};

module.exports.get_user_by_phone = async (phone_number) => {
  return await users.findOne({
    where: { phone_number },
    row: true,
  });
};

module.exports.get_user_by_id = async (id) => {
  return await users.findOne({
    where: { id },
    row: true,
  });
};

module.exports.get_users = async () => {
  return await users.findAll({
    row: true,
  });
};

const { users } = require("../models");

module.exports.insert_new_user = async (data) => {
  return await users.create(data);
};

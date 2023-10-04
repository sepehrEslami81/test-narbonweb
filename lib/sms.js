const { default: axios } = require("axios");

module.exports.send_otp_sms = async (phone, code) => {
  try {
    const token = process.env.KAVEH_NEGAR_KEY;
    const url = `https://api.kavenegar.com/v1/${token}/verify/lookup.json`;
    return await axios.get(url, {
      params: {
        template: "gc-verify-code",
        receptor: phone,
        token: code + "",
      },
    });
  } catch (error) {
    console.log(error.response.status);
    return null;
  }
};

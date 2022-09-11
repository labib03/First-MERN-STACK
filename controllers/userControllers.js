// login
const userLogin = async (req, res) => {
  res.json({ msg: "User Login Success" });
};

// Sign Up
const userSignUp = async (req, res) => {
  res.json({ msg: "User sign up success" });
};

module.exports = { userLogin, userSignUp };

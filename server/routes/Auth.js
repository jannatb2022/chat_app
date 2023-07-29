const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if(emailCheck)
        return res.json({ msg: "Email already used", status: false});

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
        username: username,
        email: email,
        password: hashpassword
    })
    const user = newUser.save();
    return res.status(200).json(user);    
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
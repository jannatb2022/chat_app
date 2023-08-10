const router = require("express").Router();
const Users = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await Users.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "username already used", status: false });

    const emailCheck = await Users.findOne({ email });
    if(emailCheck)
        return res.json({ msg: "Email already used", status: false});

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = await  Users.create({
        username: username,
        email: email,
        password: hashpassword
    })
    
    return res.json({status: true, newUser});    
  } catch (error) {
    next(error)
  }
});

router.post("/login", async(req, res, next)=>{

  try {
    const {username, password} = req.body;
    const user = await Users.findOne({username});
    if(!user)
      return res.json({msg: "Incorrect Username or Password", status: false});
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid)
      return res.json({msg: "Incorrect Username or Password", status: false});

    return res.json({status: true, user})
  } catch (error) {
    next(error)
  }
  
});

router.get("/allusers/:id", async(req, res, next)=>{
  
  try {
    const users =  await Users.find({_id: { $ne: req.params.id}}).select(["email", "username", "avatarImage", "_id"]);
    return res.json({status: true, users});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
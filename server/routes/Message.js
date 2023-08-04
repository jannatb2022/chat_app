const Messages = require("../models/MessageModel");
const router = require("express").Router();

router.post("/messages", async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    console.log(data);
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "message sending failed" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
const Messages = require("../models/MessageModel");
const router = require("express").Router();

router.post("/addMessages", async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "message sending failed" });
  } catch (error) {
    next(error);
  }
});

router.post("/getMessages", async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt : 1});

    const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    
  } catch (error) {
    next(error)
  }

  
});

module.exports = router;

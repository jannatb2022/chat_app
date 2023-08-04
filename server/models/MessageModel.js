
const mongose = require("mongoose");

const messageSchema = new mongose.Schema({
    message: {
        text: { type: String, required: true}
    },
    users: Array,
    sender: {
        type: mongose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongose.model("Messages", messageSchema);
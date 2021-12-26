const mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
});

const Messagedb = mongoose.model("messages", messageSchema);

module.exports = Messagedb;

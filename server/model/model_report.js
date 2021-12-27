const mongoose = require("mongoose");

var reportSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
  },
});

const reportdb = mongoose.model("reports", reportSchema);

module.exports = reportdb;

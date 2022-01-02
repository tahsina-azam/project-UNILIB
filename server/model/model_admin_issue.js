const mongoose = require("mongoose");

var adminissueSchema = new mongoose.Schema({
  issue_date: {
    type: String,
    // required : true,
  },
  issue_time: {
    type: String,
    // required : true,
  },
  issued_book: {
    type: String,
    // required : true,
  },
  issued_user: {
    type: String,
  },
  status: {
    type: String,
  },
});

const adminissuedb = mongoose.model("adminissue", adminissueSchema);

module.exports = adminissuedb;

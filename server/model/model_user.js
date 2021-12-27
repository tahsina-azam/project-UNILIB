const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  id: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  registration: {
    type: Number,
    required: true,
    unique: true,
  },
  session: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
  },
  books: [
    {
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
    },
  ],
});

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;

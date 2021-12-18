const mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
  },
  pdfLink: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
  },
});

const Booksdb = mongoose.model("books", bookSchema);

module.exports = Booksdb;

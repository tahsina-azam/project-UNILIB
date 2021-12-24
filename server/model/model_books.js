const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

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

bookSchema.plugin(mongoose_fuzzy_searching, { fields: ["bookName", "writer"] });

const Booksdb = mongoose.model("books", bookSchema);

module.exports = Booksdb;

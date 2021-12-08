const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    book:{
        type:String,
        required:true
    },
    writer: {
        type: String,
        required: true,
        unique: true
    },
    pdflink: {
        type: String,
        required: true
    },
    coverpage: {
        type:Number,
        required:true,
        unique:true
    },
    number: {
        type:Number,
        required:true
    }
})

const Booksdb = mongoose.model('books',schema);

module.exports = Booksdb;
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  author: {
    type: String,
    required: true,
    minlength: [3, 'Author name must be at least 3 characters long'],
    maxlength: [50, 'Author name cannot exceed 50 characters'],
  },
  publicationYear: {
    type: Number,
    required: true,
    min: [1000, 'Publication year must be after year 1000'],
    max: [new Date().getFullYear(), 'Publication year cannot be in the future'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = {BookModel};

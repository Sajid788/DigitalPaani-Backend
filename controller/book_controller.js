const { BookModel } = require("../model/book_model");
const getBooks = async (req, res) => {
  const { author, year, page = 1, limit = 10 } = req.query;
  try {
    let query = {};

    // filtering by author
    if (author) {
      query.author = author;
    }
    // filtering by publication year
    if (year) {
      query.publicationYear = year;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    const totalCount = await BookModel.countDocuments(query);
    const books = await BookModel.find(query)
      .skip(skip) 
      .limit(parseInt(limit)); 
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      message: "Get all books successfully!",
      data: books,
      totalCount,
      totalPages,
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Get a single book by ID
const getBookById = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createBook = async (req, res) => {
  const { title, author, publicationYear } = req.body;

  // Validate request body
  if (!title || !author || !publicationYear) {
    return res.status(400).json({ msg: "Please fill all the details" });
  }

  try {
    // Create a new book using the BookModel
    const book = await BookModel.create({
      title: title,
      author: author,
      publicationYear: publicationYear,
      createrId: req.userId,
    });

    res.status(201).json({ msg: "Book created successfully", data: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// update book by id
const updateBook = async (req, res) => {
  const id = req.params.id;
  const createrId = req.userId;

  try {
    // Check if the book exists and was created by the current user
    const book = await BookModel.findOne({ _id: id, createrId });
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found or not authorized" });
    }
    // Update the book
    const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book updated successfully", data: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete book
const deletedBook = async (req, res) => {
  const { id } = req.params;
  const createrId = req.userId;

  try {
    const book = await BookModel.findOneAndDelete({ _id: id, createrId });
    if (!book) {
      return res.status(404).send({ msg: "Book not found or unauthorized!" });
    }
    res.status(200).send({ msg: "Book deleted successfully", book });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal server error!" });
  }
};

module.exports = { getBooks, getBookById, createBook, updateBook, deletedBook };

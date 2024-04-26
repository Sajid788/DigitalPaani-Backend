const express = require('express');
const bookRouter = express.Router();
const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deletedBook
} = require('../controller/book_controller');

// Define routes
bookRouter.get('/', getBooks);
bookRouter.get('/:id', getBookById);
bookRouter.post('/', createBook);
bookRouter.patch('/:id', updateBook);
bookRouter.delete('/:id', deletedBook);

module.exports = {bookRouter};

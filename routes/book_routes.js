const express = require('express');
const bookRouter = express.Router();
const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deletedBook
} = require('../controller/book_controller');
const authorization = require('../middleware/authorization')


// Define routes
bookRouter.get('/', getBooks);
bookRouter.get('/:id',authorization, getBookById);
bookRouter.post('/', authorization, createBook);
bookRouter.patch('/:id',authorization, updateBook);
bookRouter.delete('/:id',authorization, deletedBook);

module.exports = {bookRouter};

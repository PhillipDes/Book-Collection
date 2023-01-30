const express = require('express')
const {
    createBook,
    getBook,
    getBooks,
    deleteBook,
    updateBook
} = require('../controllers/bookController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require authentification on all book routes
router.use(requireAuth)

//GET all books
router.get('/', getBooks)

//GET a single book
router.get('/:id', getBook)

//POST a book
router.post('/', createBook)

//DELETE a book
router.delete('/:id', deleteBook)

//UPDATE a book
router.patch('/:id', updateBook)

module.exports = router
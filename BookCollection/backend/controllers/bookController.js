const Book = require('../models/bookModel')
const mongoose = require('mongoose')

//get all books
const getBooks = async (req, res) => {
    const user_id = req.user._id

    const books = await Book.find({user_id}).sort({createdAt: -1})

    res.status(200).json(books)
}

//get a single book
const getBook = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"Book Doesn't Exist"})
    }

    const book = await Book.findById(id)

    if(!book){
        return res.status(404).json({error:"Book Doesn't Exist"})
    }

    res.status(200).json(book)
}

//create a new book
const createBook = async (req, res) => {
    const {title, author, isbn} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!author) {
        emptyFields.push('author')
        
    }
    if(emptyFields.length > 0)
    {
        return res.status(400).json({error: 'Fill in all required fields', emptyFields})
    }
    
    if(isbn.length < 13 && isbn.length > 0) {
        emptyFields.push('isbn')
        return res.status(400).json({error:"ISBN format not correct", emptyFields})
    }

    //add doc to db
    try{
        const user_id = req.user._id
        const book = await Book.create({title, author, isbn, user_id})
        res.status(200).json(book)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a book
const deleteBook = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"Book Doesn't Exist"})
    }

    const book = await Book.findOneAndDelete({_id: id})

    if(!book){
        return res.status(400).json({error:"Book Doesn't Exist"})
    }

    res.status(200).json(book)
}

//update a book
const updateBook = async (req, res) => {
    const {id} = req.params
    const {title, author, isbn} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"Book Doesn't Exist"})
    }

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!author) {
        emptyFields.push('author')
        
    }
    if(emptyFields.length > 0)
    {
        return res.status(400).json({error: 'Fill in all required fields', emptyFields})
    }
    
    //check if isbn wasn't included or is of adequate length
    if(isbn.length < 13 && isbn.length > 0) {
        emptyFields.push('isbn')
        return res.status(400).json({error:"ISBN format not correct", emptyFields})
    }
    
    const book = await Book.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!book){
        return res.status(400).json({error:"Book Doesn't Exist"})
    }

    res.status(200).json(book)
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook
}
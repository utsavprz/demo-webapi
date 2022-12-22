const Book = require ('../models/books')

const notImplemented = (req,res) => {
    res.json({"msg": "not implemented"})
}
const getAllBooks = (req,res,next) => {
    Book.find()
        .then((books)=>{res.json(books)})
        .catch((err)=>next(err))
}

const createNewBook = (req,res, next) => {
    Book.create(req.body)
        .then((book)=>{res.status(201).json(book)})
        .catch((err)=>next(err))
}

const deleteAllBooks = (req,res,next) => {
    Book.deleteMany()
        .then((reply)=>{res.json(reply)})
        .catch((err)=>next(err))
}

const getBookById = (req,res,next) => {
    Book.findById(req.params.id)
    .populate('category')
    .then(book => res.json(book))
    .catch(err => next(err))
}

const deleteBookById = (req,res,next) => {
    Book.findByIdAndDelete(req.params.id)
    .then(book => res.json(book))
    .catch(err => next(err))
}

const updateBookById = (req,res,next) => {
    Book.findByIdAndUpdate(req.params.id, {$set: req.body})
    .then(book => res.json(book))
    .catch(err => next(err))
}

module.exports = {getAllBooks, createNewBook, deleteAllBooks, getBookById, deleteBookById, updateBookById, notImplemented}
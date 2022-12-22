const Book = require('../models/books')

const getAllReviews = (req,res, next) =>{
    Book.findById(req.params.id)
    .then((book) => {res.json(book.reviews)})
    .catch(err => next(err))
}

const createReview = (req, res, next) =>{
    Book.findById(req.params.id)
    .then((book) => {
        book.reviews.push(req.body)
        book.save().then((b)=>{res.json(b.reviews)})
    })
    .catch(err => next(err))
}


const deleteAllReview = (req,res, next) =>{
    Book.findById(req.params.id)
    .then((book) => {
        book.reviews = []
        book.save().then((b)=>{res.json(b.reviews)})
    })
    .catch(err => next(err))
}


const getReviewById = (req,res,next) => {
    Book.findById(req.params.id)
    .then((book)=>res.json(book))
    .catch(err => next(err))
}

const updateReviewById = (req,res,next) => {
    Book.findById(req.params.id)
    .then((book)=> {
        let updatedReviews = book.reviews.map(
            (item) => {
                if (item.id  == req.params.review_id){
                    item.body = req.body.body
                }
                return item;
        }
        )
        book.reviews = updatedReviews;
        book.save().then(book => res.json(book.reviews));
    })
    .catch(err => next(err))
}

const deleteReviewById = (req,res,next) => {
    Book.findById(req.params.id)
    .then((book)=> {
        let updatedReviews = book.reviews.filter(
                (item)=>{
                    return item.id != req.params.review_id
                }
            )
        book.reviews = updatedReviews;
        book.save().then(book => res.json(book.reviews))
    })
    .catch(err => next(err))
}

module.exports={
    getAllReviews,
    createReview,
    deleteAllReview,
    getReviewById,
    updateReviewById,
    deleteReviewById
}


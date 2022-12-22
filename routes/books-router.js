const express = require('express');

const router = express.Router();
const booksController = require('../controllers/books-controller');
const reviewController = require('../controllers/reviews-controller');
const { verifyUser } = require('../middleware/auth');


router.route('/')
    .get(booksController.getAllBooks)
    .post(verifyUser, booksController.createNewBook)
    .put(booksController.notImplemented)
    .delete(booksController.deleteAllBooks)

router.route('/:id')
    .get(booksController.getBookById)
    .post(booksController.notImplemented)
    .put(booksController.updateBookById)
    .delete(booksController.deleteBookById)

router.route('/:id/reviews')
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview)
    .put((req,res) =>{
        res.status(500).json({'msg': 'Not implemented'})
    })
    .delete(reviewController.deleteAllReview)

router.route('/:id/reviews/:review_id')
    .get(reviewController.getReviewById)
    .post((req,res) =>{
        res.status(500).json({'msg': 'Not implemented'})
    })
    .put(reviewController.updateReviewById)
    .delete(reviewController.deleteReviewById)
    

module.exports  = router;
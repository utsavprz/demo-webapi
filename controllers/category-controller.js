const Category = require('../models/category')


const getAllCategory = (req,res,next) => {
    Category.find()
    .then((category)=>{res.json(category)})
    .catch(err => next(err))
}

const createNewCategory = (req,res,next) => {
    Category.create(req.body)
    .then((category)=>{res.status(201).json(category)})
    .catch(err => next(err))
}
const deleteAllCategory = (req,res,next) => {
    Category.deleteMany()
    .then((reply)=>{res.json(reply)})
    .catch(err => next(err))
}
const getCategoryById = (req,res,next) => {
    Category.findById(req.params.category_id)
    .then((category)=>{res.json(category)})
    .catch(err => next(err))
}
const updateCategoryById = (req,res,next) => {
    Category.findByIdAndUpdate(req.params.category_id,
        {$set: req.body},{new:true})
    .then((category)=>{res.json(category)})
    .catch(err => next(err))
}
const deleteCategoryById = (req,res,next) => {
    Category.findByIdAndDelete(req.params.category_id)
    .then((reply)=>{res.json(reply)})
    .catch(err => next(err))
}

module.exports = {getAllCategory, createNewCategory, deleteAllCategory, getCategoryById, updateCategoryById, deleteCategoryById}
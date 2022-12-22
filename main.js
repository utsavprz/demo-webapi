const express = require('express');
const app  = express();
const booksRouter = require('./routes/books-router');
const categoryRouter = require('./routes/category-router');
const userRouter = require('./routes/user-router')
const mongoose = require('mongoose');
const { verifyUser } = require('./middleware/auth');

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/mydb').then(
    ()=> {
        console.log('Connected to mydb')
    }
).catch(
    (err)=>{console.log(err)
    })
//? In-built middleware
app.use(express.json())

//? Router level middleware
app.use('/users', userRouter)
app.use(verifyUser)
app.use('/books', booksRouter)
app.use('/category', categoryRouter)

// ? Error handling middleware
app.use((err,req,res,next) =>{
    console.log(err.stack);
    res.status(501).json({"err":err.message})
})


app.listen(3000, () => {
    console.log('App is running on port 3000');
}) 
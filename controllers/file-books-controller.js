const booksdb = require('../data/books')

const getAllBooks = (req,res) => {
    res.json(booksdb);
}

const createNewBook = (req, res) => {
    let newBook = {
        'id': booksdb[booksdb.length - 1].id + 1,
        'title': req.body.title,
        'author': req.body.author
    }
    booksdb.push(newBook);
    res.json(booksdb);
}

const notImplemented = (req,res) => {
    res.status(501).json({'msg': "Not Implemented"});
}

const deleteAllBooks = (req,res) => {
    booksdb = {};
    res.json(booksdb);
}

const getSingleBook = (req,res)=>{
    let theBook = booksdb.find((item)=>{
        return item.id == req.params.id;
    })
    res.json(theBook);
}

const updateBook = (req,res)=>{
    let updatedBook = booksdb.map((item)=>{
        if (item.id == req.params.id){
            item.title = req.body.title,
            item.author = req.body.author
        }
        return item;
    })
    res.json(updatedBook);
}

const deleteSingleBook = (req,res)=>{
    // let updateddb = booksdb.filter((item)=>{
    //     return item.id != req.params.id;
    // })
    let updateddb = booksdb.filter(item=> item.id != req.params.id)
    res.send(updateddb);
}

module.exports = {
    getAllBooks,
    createNewBook,
    notImplemented,
    deleteAllBooks,
    getSingleBook,
    updateBook,
    deleteSingleBook
}
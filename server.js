const express = require('express')
const mongoose = require('mongoose')
const Books = require('./models/books.js')

const app = express()
app.use(express.json())


app.post('/books', (req,res) => {
  Books.create(req.body, (err,addBook) => {
    res.json(addBook)
  })
})


app.get('/books', (req,res) => {
  Books.find({}, (err, foundBook) => {
    res.json(foundBook)
  })
})


app.delete('/books/:id', (req,res) => {
  Books.findByIdAndDelete(req.params.id, (err, deletedBook) => {
    res.json(deletedBook)
  })
})


app.put('/books/:id', (req,res) => {
  Books.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedBook) => {
    res.json(updatedBook)
  })
})



app.listen(3000, () => {
  console.log('listening')
})

mongoose.connect('mongodb://localhost:27017/books')
mongoose.connection.once('open', () => {
  console.log('connected to mongod');
})

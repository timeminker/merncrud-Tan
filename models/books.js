const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema ({
  name:{type:String, required:true, unique:true},
  category:{type:String, required:true},
  author:String,
  image:String,
  booked:Boolean
})

const Books = mongoose.model('Book', bookSchema)

module.exports = Books
